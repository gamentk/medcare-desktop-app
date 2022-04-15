import RPi.GPIO as GPIO
import time

from ultrasonic import distance

GPIO_SERVO = int('11')

GPIO.setmode(GPIO.BOARD)
GPIO.setup(GPIO_SERVO, GPIO.OUT)

servo = GPIO.PWM(GPIO_SERVO, 50)


def start():
    servo.start(2)
    servo.ChangeDutyCycle(2)


def stop():
    servo.stop()


if __name__ == '__main__':
    try:
        while True:
            start()

            dist = distance()
            print("%.1f" % dist)

            if dist <= 4:
                stop()
                break

            time.sleep(0.03)

        GPIO.cleanup()
    except KeyboardInterrupt:
        print("Measurement stopped by User")
        GPIO.cleanup()
