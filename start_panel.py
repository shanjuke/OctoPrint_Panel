#!/usr/bin/env python
import webkit
import gobject
import gtk


class Panel():
    def __init__(self):
        gobject.threads_init()
        win = gtk.Window()
        win.set_size_request(320, 240)
        bro = webkit.WebView()
        bro.open("http://0.0.0.0:4000")
        win.add(bro)
        win.set_position(gtk.WIN_POS_CENTER)
        # win.fullscreen()
        win.show_all()
        gtk.main()


if __name__ == '__main__':
    Panel()
