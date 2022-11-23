let move_speed = 15, grativy = 0.05;
let plane = document.querySelector('.plane');
let img = document.getElementById('plane-1');
let sound_point = new Audio('sounds effect/point.mp3');
let sound_die = new Audio('sounds effect/die.mp3');

let plane_props = plane.getBoundingClientRect();

let background = document.querySelector('.background').getBoundingClientRect();

let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let game_state = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {
    
    if(e.key == 'ArrowUp' && game_state != 'Play'){
        document.querySelectorAll('.obstacle_sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        plane.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
});

function play(){
    function move(){
        if(game_state != 'Play') return;

        let obstacle_sprite = document.querySelectorAll('.obstacle_sprite');
        obstacle_sprite.forEach((element) => {
            let obstacle_sprite_props = element.getBoundingClientRect();
            plane_props = plane.getBoundingClientRect();

            if(obstacle_sprite_props.right <= 0){
                element.remove();
            }else{
                if(plane_props.left < obstacle_sprite_props.left + obstacle_sprite_props.width && plane_props.left + plane_props.width > obstacle_sprite_props.left && plane_props.top < obstacle_sprite_props.top + obstacle_sprite_props.height && plane_props.top + plane_props.height > obstacle_sprite_props.top){
                    game_state = 'End';
                    message.innerHTML = 'YOU DIED'.fontcolor('red');
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    sound_die.play();
                    return;
                }else{
                    if(obstacle_sprite_props.right < plane_props.left && obstacle_sprite_props.right + move_speed >= plane_props.left && element.increase_score == '1'){
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                        sound_point.play();
                    }
                    element.style.left = obstacle_sprite_props.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let plane_dy = 0;
    function apply_gravity(){ 
        if(game_state != 'Play') return;
        plane_dy = plane_dy + grativy;
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'images/baloonUp.png';
                plane_dy = -3;
            }
            if(e.key == 'ArrowDown' || e.key == ' '){
                img.src = 'images/baloon1.png';
                plane_dy = 3;
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'images/baloonUp.png';
            }
        });

        if(plane_props.top <= 0 || plane_props.bottom >= background.bottom){
            game_state = 'End';
            img.src='images/explosion.png';
            time=50;
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        plane.style.top = plane_props.top + plane_dy + 'px';
        plane_props = plane.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let obstacle_seperation = 0;

    let obstacle_gap = 25;

    function create_obstacle(){
        if(game_state != 'Play') return;

        if(obstacle_seperation > 115){
            obstacle_seperation = 0;

            let obstacle_posi = Math.floor(Math.random() * 43) + 8;
            let obstacle_sprite_inv = document.createElement('div');
            obstacle_sprite_inv.className = 'obstacle_sprite';
            obstacle_sprite_inv.style.top = obstacle_posi - 50 + 'vh';
            obstacle_sprite_inv.style.left = '100vw';

            document.body.appendChild(obstacle_sprite_inv);
            let obstacle_sprite = document.createElement('div');
            obstacle_sprite.className = 'obstacle_sprite';
            obstacle_sprite.style.top = obstacle_posi + obstacle_gap + 'vh';
            obstacle_sprite.style.left = '100vw';
            obstacle_sprite.increase_score = '1';

            document.body.appendChild(obstacle_sprite);
        }
        obstacle_seperation++;
        requestAnimationFrame(create_obstacle);
    }
    requestAnimationFrame(create_obstacle);
}