import RPi.GPIO as GPIO


def init(pin):
    GPIO_SERVO = pin

    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(GPIO_SERVO, GPIO.OUT)

    global servo
    servo = GPIO.PWM(GPIO_SERVO, 50)


def start():
    servo.start(2)
    servo.ChangeDutyCycle(2)


def stop():
    servo.stop()
