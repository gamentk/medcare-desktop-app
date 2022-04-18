import sys
from os import remove
from gtts import gTTS
from playsound import playsound

print(str(sys.argv))

tts = gTTS(text=sys.argv[1], lang='th')
tts.save('hello.mp3')

playsound('hello.mp3', True)
remove('hello.mp3')
