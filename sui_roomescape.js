// 방 생성
room = game.createRoom("room", "할로윈방-1.png")
sideview = game.createRoom("sideview", "할로윈방-1-우.png")
room2 = game.createRoom("room2", "할로윈방-2.png")

// 방 밝기 조정
roomLight = false // 플래그 변수
room.setRoomLight(0.5)
sideview.setRoomLight(0.5)
room2.setRoomLight(0.3)

// ************** 메인 방 ************** 
// 전등
room.lamp = room.createObject("lamp", "전등-끔.png") 
room.lamp.setWidth(80)
room.locateObject(room.lamp, 1100, 65)

room.lamp.onClick = function()
{
    if(roomLight)
    {
        room.lamp.setSprite("전등-끔.png")
        room.setRoomLight(0.5)
        sideview.setRoomLight(0.5)
        roomLight = false
        playSound("lightswitch.wav")
    }
    else
    {
        room.lamp.setSprite("전등-킴.png")
        room.setRoomLight(1)
        sideview.setRoomLight(1)
        roomLight = true
        playSound("lightswitch.wav")
    }
}

// 소주
room.soju = room.createObject("soju", "소주.png")
room.soju.setWidth(45)
room.locateObject(room.soju, 240, 544)

room.soju.onClick = function()
{
    playSound("click.wav")
    printMessage("먹다 남은 소주네")
}

// 피자박스
room.pizzabox = room.createObject("pizzabox", "피자박스-닫힘.png")
room.pizzabox.setWidth(240)
room.locateObject(room.pizzabox, 400, 535)

room.pizzabox.onClick = function()
{
    playSound("click.wav")
    room.pizzabox.setSprite("피자박스-열림.png")
    room.locateObject(room.pizzabox, 400, 480)
    room.locateObject(room.note, 360, 440) // 쪽지를 피자박스 위로 보이게 함
    room.note.show()
}

// 쪽지
room.note = room.createObject("note", "쪽지.png")
room.note.setWidth(50)
room.locateObject(room.note, 360, 440)
room.note.hide()

room.note.onClick = function()
{
    if (roomLight == false)
    {
        playSound("click.wav")
        printMessage("어두워서 잘 안보인다. 불부터 켜보자.")
    }
    else
    {
        playSound("click.wav")
        showImageViewer("쪽지내용.png", "");
        printMessage("이게 무슨 뜻이지?")
    }
}

// 식칼
room.knife = room.createObject("knife", "식칼.png")
room.knife.setWidth(150)
room.locateObject(room.knife, 600, 600)

room.knife.onClick = function()
{
    playSound("pick.wav")
    printMessage("매우 날카로운 식칼이다.")
    room.knife.pick()
}

// 피
room.blood = room.createObject("blood", "피.png")
room.blood.setWidth(230)
room.locateObject(room.blood, 700,500)

room.blood.onClick = function()
{
    playSound("click.wav")
    printMessage("헉..누구 피지? 친구들을 빨리 찾아야해")
}

// TV
room.tv = room.createObject("tv", "tv-1.png")
room.tv.setWidth(260)
room.locateObject(room.tv, 1000, 230)

room.tv.onClick = function()
{
    if (game.getHandItem() == room.cd) // cd를 사용할 경우에 동영상 실행
    {
        playSound("tv_on.wav")
        showVideoPlayer("video.mp4")
    }
    
    else{
        playSound("click.wav")
        room.tv.setSprite("tv-2.png")
    } 
}

// 호박1
room.pumpkin1 = room.createObject("pumpkin1", "호박1.png") 
room.pumpkin1.setWidth(120)
room.locateObject(room.pumpkin1, 1080, 600)

// 호박2
room.pumpkin2 = room.createObject("pumpkin2", "호박2.png")
room.pumpkin2.setWidth(120)
room.locateObject(room.pumpkin2, 1180, 600)

room.pumpkin2.onClick = function() // 의문:이게 다른 방에서 pick한 아이템을 들고 클릭하면 else문이 실행안됨
{
    if(roomtorch == false && game.getHandItem() == room.knife)
    {
        playSound("click_working.wav")
        room.pumpkin2.setSprite("호박-잘림.png")
        room.torch.show() // 토치 보이기
        roomtorch = true
    }
    else
    {
        playSound("click.wav")
        printMessage("이거 진짜 호박인가? 너무 가벼운데")
    }
    
}

// room에서 보이는 토치
room.torch = room.createObject("torch", "토치.png") // 토치 생성
room.torch.setWidth(70)
room.locateObject(room.torch, 1080, 680)
room.torch.hide() // 토치 숨기기
roomtorch = false

room.torch.onClick = function()
{
    playSound("pick.wav")
    sideview.torch.pick()
    room.torch.hide()
    printMessage("호박 안에 있던 토치를 얻었다.")
}

// 이동 화살표
room.rightarrow = room.createObject("rightarrow", "화살표2.png") // 방 오른쪽 뷰로 가는 화살표
room.rightarrow.setWidth(150)
room.locateObject(room.rightarrow, 1200, 400)

sideview.leftarrow = sideview.createObject("leftarrow", "화살표1.png") // 원래 방 뷰로 가는 화살표
sideview.leftarrow.setWidth(150)
sideview.locateObject(sideview.leftarrow, 82, 400)

room.rightarrow.onClick = function()
{
    playSound("room_transition.wav")
    game.move(sideview)
}

sideview.leftarrow.onClick = function()
{
    playSound("room_transition.wav")
    game.move(room)
}

// ************** 오른쪽 뷰 ************** 

// 칠판
sideview.board = sideview.createObject("board", "칠판.png")
sideview.board.setWidth(250)
sideview.locateObject(sideview.board, 490, 300)

sideview.board.onClick = function()
{
    if (roomLight == false && game.getHandItem() == sideview.torch) // 불이 꺼져있고 토치를 사용할 경우
    {
        playSound("click.wav")
        showImageViewer("칠판-줌인2.png")
        printMessage("잘 보인다.")
    }
    
    else
    {
        playSound("click.wav")
        showImageViewer("칠판-줌인1.png")
        printMessage("밑에 희미하게 뭐라고 적혀있는데 잘 안보인다. 야광인가..?")
    }
}

// 문
sideview.door = sideview.createObject("door", "문1-닫힘.png")
sideview.door.setWidth(180)
sideview.locateObject(sideview.door, 1100, 275)
sideview.door.lock() // door 상태를 locked로 변경

sideview.door.onClick = function() 
{
    if(sideview.door.isClosed())
    {
        playSound("door_open.wav")
        sideview.door.open()
    }
    else if(sideview.door.isOpened())
    {
        playSound("room_transition.wav")
        game.move(room2)
       printMessage("음침한 방이다...너무 추워")
    }
    else if(sideview.door.isLocked())
    {
        playSound("click.wav")
        printMessage("문이 잠겨있다.")
    }
    else {}
}

sideview.door.onOpen = function()
{
    sideview.door.setSprite("문1-열림.png")
    sideview.locateObject(sideview.door, 1053,280)
}

sideview.door.onClose = function()
{
    sideview.door.setSprite("문1-닫힘.png")
    sideview.locateObject(sideview.door, 1100,275)
}

// sideview에서 사용되는 토치
sideview.torch = sideview.createObject("torch", "토치.png")
sideview.torch.setWidth(70)
sideview.locateObject(sideview.torch, 80, 680)
sideview.torch.hide()

// sideview에서 나타나는 드라이버
sideview.driver = sideview.createObject("driver", "드라이버.png")
sideview.driver.setWidth(70)
sideview.locateObject(sideview.driver, 880, 680)

// room2로 가는 키패드
sideview.keypad = sideview.createObject("keypad", "숫자키.png")
sideview.keypad.setWidth(50)
sideview.locateObject(sideview.keypad, 955, 250)

sideview.keypad.onClick = function()
{
    playSound("click.wav")
    printMessage("Chalk Board")
    showKeypad("number", "0001", function(){
        playSound("door_unlock.wav")
        sideview.door.unlock()
        printMessage("잠금장치가 열렸다.")
    })
}

// ************** 방2 ************** 

// 성냥
room2.match = room2.createObject("match", "성냥.png") 
room2.match.setWidth(40)
room2.locateObject(room2.match, 1173, 565)
room2.match.setItemDescription("성냥이 많이 들어있다.")

room2.match.onClick = function()
{
    playSound("pick.wav")
    room2.match.pick()
    printMessage("성냥을 주웠다.")
}

// 캔들
room2.candle = room2.createObject("candle", "캔들.png")
room2.candle.setWidth(75)
room2.locateObject(room2.candle, 226, 411)

room2.candle.onClick = function()
{
    if (game.getHandItem() == room2.match)
    {
        playSound("click_working.wav")
        room2.setRoomLight(0.7)
        printMessage("밝으니까 좀 낫네")
    }
    else
    {
        playSound("click.wav")
        printMessage("여기에 불을 붙일 수 있겠군")
    }
}

// room2에서 사용되는 드라이버
room2.driver = room2.createObject("driver", "드라이버.png")
room2.driver.setWidth(70)
room2.locateObject(room2.driver, 880, 680)
room2.driver.hide()

sideview.driver.onClick = function()
{
    playSound("pick.wav")
    room2.driver.pick()
    sideview.driver.hide()
    printMessage("웬 드라이버지?")
}

// 벽에 걸린 그림
room2.picture = room2.createObject("picture", "그림1.png")
room2.picture.setWidth(130)
room2.locateObject(room2.picture, 167, 230)

room2.picture.onClick = function()
{
    if (roompaper == false && game.getHandItem() == room2.driver)
    {
        playSound("click_working.wav")
        showImageViewer("그림1-해체.png")
        printMessage("해체했더니 안에서 종이가 떨어졌다.")
        room2.picture.setSprite("그림1-해체.png")
        room2.paper.show()
        roompaper = true
    }

    else if (roompaper == true){}
    
    else
    {
        playSound("click.wav")
        showImageViewer("그림1-줌인.png")
        printMessage("오른쪽에만 나사가?")
    }
}

// 힌트가 적힌 종이
room2.paper = room2.createObject("paper", "종이.png")
room2.paper.setWidth(70)
room2.locateObject(room2.paper, 167, 600)
room2.paper.hide()
roompaper = false

room2.paper.onClick = function()
{
    playSound("click.wav")
    showImageViewer("종이.png")
    room2.car.move = true
}

// 미니카
room2.car = room2.createObject("car", "미니카.png")
room2.car.setWidth(150)
room2.locateObject(room2.car, 1170, 640)

room2.car.move = false
room2.car.onDrag = function(direction)
{
    if(direction == "Left" && room2.car.move)
    {
        playSound("finaldoor.wav")
        room2.car.moveX(-150)
        room2.car.move = false
        room2.cd.show()
        room2.finaldoor.show()
        room2.keypad.show()
        printMessage("차가 움직이더니 문이 나타났다!")
    }

    else
    {
        playSound("click.wav")
        printMessage("평범한 미니카이다.")
    }
}

// room2에서 보이는 cd
room2.cd = room2.createObject("cd", "cd.png")
room2.cd.setWidth(60)
room2.locateObject(room2.cd, 1170, 640)
room2.cd.hide()

// room에서 사용되는 cd

room.cd = room.createObject("cd", "cd.png")
room.cd.setWidth(60)
room.locateObject(room.cd, 1170, 640)
room.cd.hide()

room2.cd.onClick = function()
{
    playSound("pick.wav")
    room.cd.pick()
    room2.cd.hide()
    printMessage("정체불명의 CD를 주웠다.")
}

// 마지막 문
room2.finaldoor = room2.createObject("finaldoor", "finaldoor.png")
room2.finaldoor.setWidth(200)
room2.locateObject(room2.finaldoor, 600, 375)
room2.finaldoor.hide()
room2.finaldoor.lock()

room2.finaldoor.onClick = function()
{
    if (room2.finaldoor.isClosed()){
        playSound("door_open2.wav")
        room2.finaldoor.open()
    } else if (room2.finaldoor.isOpened()){
        game.clear()
    } else if (room2.finaldoor.isLocked()){
        playSound("click.wav")
        printMessage("잠겨있다.")
    }
}

room2.finaldoor.onOpen = function()
{
    room2.finaldoor.setSprite("finaldoor-2.png")
}

// 알파벳 키패드
room2.keypad = room2.createObject("keypad", "알파벳키.png")
room2.keypad.setWidth(80)
room2.locateObject(room2.keypad, 740, 330)
room2.keypad.hide()

room2.keypad.onClick = function()
{
    showKeypad("alphabet", "TRICK", function(){
        playSound("door_unlock.wav")
        room2.finaldoor.unlock()
        printMessage("문이 열렸다!")
    })
}

// 메인방으로 가는 화살표
room2.arrow = room2.createObject("arrow", "화살표3.png")
room2.arrow.setWidth(150)
room2.locateObject(room2.arrow, 626, 675)

room2.arrow.onClick = function()
{
    playSound("room_transition.wav")
    game.move(sideview)
}

// **************게임 시작***************
game.start(room)
printMessage("아..머리아파... 친구들은 어디갔지?")