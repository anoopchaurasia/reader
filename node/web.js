/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
 fm.Package("");
 fm.Class("webPath");
 webPath = function (me) {
     Static.path = {
        "reader" : {'class':"app.Reader"},
        "location": {'class':"app.Location"}
    };
    Static.sources = 'web';
};
