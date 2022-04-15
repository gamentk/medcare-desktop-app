import RPi.GPIO as GPIO

GPIO_SERVO = 11

GPIO.setmode(GPIO.BOARD)
GPIO.setup(GPIO_SERVO, GPIO.OUT)

servo = GPIO.PWM(GPIO_SERVO, 50)


def start():
    servo.start(2)
    servo.ChangeDutyCycle(2)


def stop():
    servo.stop()
