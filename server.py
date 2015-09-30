#! /usr/bin/python
# -*- coding:utf-8 -*-

from flask import Flask
from flask import render_template
from fonctions import Fonctions


app = Flask(__name__)
app.debug = True

host = "0.0.0.0"
port = 4000
octopi_port = 5000 
    
# Render the panel interface
@app.route('/')
def index():  
    return render_template('index.html')

# Switch off the machine
@app.route('/stop')
def stop():
    f.shutdown()
    return "stop"

# Reboot the machine
@app.route('/reboot')
def reboot():
    f.reboot()
    return "reboot"

# Jog X axis
@app.route('/jogX/<x>')
def jogX(x):
    f.jogX(x)
    return "X : "+x

# Jog Y axis  
@app.route('/jogY/<y>')
def jogY(y):
    f.jogY(y)
    return "Y : "+y 

# Jog Z axis  
@app.route('/jogZ/<z>')
def jogZ(z):
    f.jogZ(z)
    return "X : "+z 

# Set z axis to 0   
@app.route('/homeZ')
def homeZ():
    f.home_z()
    return "home Z"

# Set x and z axis to 0
@app.route('/homeXY')
def homeXY():
    f.home_xy()
    return "home xy"

#Heat to the extruder or the bed to the given temperature
@app.route('/temperature/<obj>/<value>')
def set_temperature(obj='0', value='0'):
    response = ""
    if (obj == "bed"):
        f.bed(value)
    elif (obj == "extruder"):
        f.extruder(value)
    else:
        response = "This command isn't implemented !"

    return response

# Get machine list of files...
@app.route('/files')
def get_files():
    datas = f.get_files()
    return datas

# Start printing the object 
@app.route('/print/<filename>')
def start_print(filename):
    f.start_print(filename)
    return "print !"

# Cancel the printing of the object     
@app.route('/cancel')
def cancel():
    f.cancel()
    return "cancel !"

# Pause the printing of the object
@app.route('/pause')
def pause():
    f.pause()
    return "pause !"

# Resume the printing of the object : Same function as pause
@app.route('/resume')
def resume():
    f.pause()
    return "resume !"

# Get general infos...
@app.route('/infos')
def get_infos():
    datas = f.get_infos()
    return datas



# Get machine state...
@app.route('/state/<type>')
def state(type):
    datas = f.state(type)                
    return datas

@app.route('/change_filament', methods=['GET'])
def change_filament(self, value='nothing'):
    return "change_filament !"

@app.route('/set_speed', methods=['GET'])
def set_speed(self, value='0'):
    return "set speed to " + value

# Switch on or off leds
@app.route('/switch/<state>')
def switch(state):
    f.switch(state)
    return "switch "+state



if __name__ == '__main__':
    print ("Démarrage du serveur pour panel ...")
    f = Fonctions(host, octopi_port)
    app.run(host=host, port=port)
