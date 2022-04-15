def start(servo):
    servo.start(2)
    servo.ChangeDutyCycle(2)


def stop(servo):
    servo.stop()
