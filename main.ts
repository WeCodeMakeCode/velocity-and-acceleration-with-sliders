function change_x (amount: number) {
    if (!(b_flashing_labels)) {
        active_x.value += amount
        if (slider_velocity_X.selected) {
            mySprite.vx += amount
        } else {
            mySprite.ax += amount
        }
    }
}
function select_velocity_sliders () {
    set_active_selected(false)
    active_x = slider_velocity_X
    active_y = slider_velocity_Y
    set_active_selected(true)
    slider_labels("v")
}
function change_y (amount: number) {
    if (!(b_flashing_labels)) {
        active_y.value += amount
        if (slider_velocity_Y.selected) {
            mySprite.vy += 0 - amount
        } else {
            mySprite.ay += 0 - amount
        }
    }
}
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    change_x(1)
})
function set_active_selected (is_selected: boolean) {
    active_x.selected = is_selected
    active_y.selected = is_selected
}
controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    change_y(-1)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    change_x(-1)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    change_y(-1)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    flip_sliders_between_v_and_a()
})
function setlect_acceleration_sliders () {
    set_active_selected(false)
    active_x = slider_acceleration_X
    active_y = slider_acceleration_Y
    set_active_selected(true)
    slider_labels("a")
}
function show_all_labels () {
    b_flashing_labels = true
    slider_velocity_X.thumb_sprite.say("vx")
    slider_velocity_Y.thumb_sprite.say("vy")
    slider_acceleration_X.thumb_sprite.say("ax")
    slider_acceleration_Y.thumb_sprite.say("ay")
    pause(2000)
    b_flashing_labels = false
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    change_x(1)
})
controller.up.onEvent(ControllerButtonEvent.Repeated, function () {
    change_y(1)
})
function make_sprites () {
    mySprite = sprites.create(img`
2 2 2 2 
2 7 7 2 
2 7 7 2 
2 2 2 2 
`, SpriteKind.Projectile)
    mySprite.setFlag(SpriteFlag.BounceOnWall, true)
    output_sprite = sprites.create(img`
. 
`, SpriteKind.Player)
    mySprite.z = 2
    mySprite.startEffect(effects.trail)
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    change_y(1)
})
function flip_sliders_between_v_and_a () {
    if (slider_velocity_X.selected) {
        setlect_acceleration_sliders()
    } else {
        select_velocity_sliders()
    }
}
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    change_x(-1)
})
function slider_labels (label: string) {
    b_flashing_labels = true
    active_x.thumb_sprite.say("" + label + "x")
    active_y.thumb_sprite.say("" + label + "y")
    pause(1000)
    b_flashing_labels = false
}
let output_sprite: Sprite = null
let mySprite: Sprite = null
let b_flashing_labels = false
let active_y: Slider = null
let active_x: Slider = null
let slider_acceleration_Y: Slider = null
let slider_acceleration_X: Slider = null
let slider_velocity_Y: Slider = null
let slider_velocity_X: Slider = null
make_sprites()
slider_velocity_X = slider.create(0, -100, 100, 100, 6, Orientation.Horizontal)
slider_velocity_Y = slider.create(0, -100, 100, 6, 100, Orientation.Vertical)
slider_velocity_Y.left = 3
slider_acceleration_X = slider.create(0, -100, 100, 100, 6, Orientation.Horizontal)
slider_acceleration_X.top = 14
slider_acceleration_Y = slider.create(0, -100, 100, 6, 100, Orientation.Vertical)
slider_acceleration_Y.left = 150
show_all_labels()
active_x = slider_velocity_X
active_y = slider_velocity_Y
set_active_selected(true)
b_flashing_labels = false
game.onUpdate(function () {
    if (!(b_flashing_labels)) {
        slider_velocity_X.value = Math.round(mySprite.vx)
        slider_velocity_Y.value = 0 - Math.round(mySprite.vy)
        slider_acceleration_X.value = Math.round(mySprite.ax)
        slider_acceleration_Y.value = 0 - Math.round(mySprite.ay)
    }
})
