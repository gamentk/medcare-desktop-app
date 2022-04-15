from os import remove
from gtts import gTTS
from playsound import playsound

tts = gTTS(text='กฤษติศักดิ์ รับยาค่ะ', lang='th')
tts.save('hello.mp3')

playsound('hello.mp3', True)
remove('hello.mp3')
