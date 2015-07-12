#! /usr/bin/python
# -*- coding:utf-8 -*-

from flask import Flask
from flask import render_template
#from flask import request
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

# Jog axis to x, y, z position
@app.route('/jog/<x>/<y>/<z>')
def jog(x, y, z):
    #print("x"+x+"-y"+y+"-z"+z)
    f.jog(x, y, z)
    return "X : "+x+", Y: "+y+", Z: "+z

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

# Switch on or off leds
@app.route('/switch/<state>')
def switch(state):
    f.switch(state)
    return "switch "+state
    
# Start printing the object 
@app.route('/start_print')
def start_print():
    f.start_print()
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

@app.route('/set_temperature', methods=['GET'])
def set_temperature(self, value='0'):
    return "set temp to " + value
    
    
    

if __name__ == '__main__':
    print ("Démarrage du serveur pour panel ...")
    f = Fonctions(host, octopi_port)
    app.run(host=host, port=port)
