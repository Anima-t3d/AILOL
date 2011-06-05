/*
 * jQuery Extended JSon Cookie Plugin
 * relese 2010-01-11
 *
 * It is licensed as free software under the terms of the GNU General Public License (GPL)
 * http://www.gnu.org/licenses/gpl.html
 *
 * This plugin is based on Jquery Cookie plugin http://plugins.jquery.com/project/cookie
 * 
 * Work by Rodolphe Franceschi
 */
 

// Class definition 
function jQueryextendedjsoncookieUtils()
{

}

/* Fonction de compatibilite avec la librairie initiale */
jQueryextendedjsoncookieUtils.corewritefunction = function(argss)
{
  var name = argss[0];
  var value = argss[1];
  var options = argss[2];


  options = options || {};
  var expires = '';
  if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
      var date;
      if (typeof options.expires == 'number') {
          date = new Date();
          date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
      } else {
          date = options.expires;
      }
      expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
  }
  var path = options.path ? '; path=' + (options.path) : '';
  var domain = options.domain ? '; domain=' + (options.domain) : '';
  var secure = options.secure ? '; secure' : '';
  var cookievalue = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
  document.cookie = cookievalue;
}






/* Simple deletion of the cookie */
jQueryextendedjsoncookieUtils.removeCookie = function(argss)
{
  var cookiename = argss[0];

  varcookievalue = jQueryextendedjsoncookieUtils.getCookieValueDecoded( argss )
  if ( varcookievalue != undefined )
  {
    document.cookie = cookiename +'=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
  } 
}

/* Simple write of all the cookie content with an empty value */
jQueryextendedjsoncookieUtils.writeEmptyCookie = function(argss)
{
  var cookiename = argss[0];

  document.cookie = cookiename + '=';
}

/* Simple write of all the cookie content */
jQueryextendedjsoncookieUtils.writeCookie = function(argss)
{
  jQueryextendedjsoncookieUtils.corewritefunction(argss);
}


/* Get the cookie value encoded */
jQueryextendedjsoncookieUtils.getCookieValue = function(argss)
{
  var cookiename =  argss[0];

  var fullcookievalue = jQueryextendedjsoncookieUtils.getFullCookie(argss);
  if (fullcookievalue == undefined)
  {
    return undefined;
  }
  return fullcookievalue.substring(cookiename.length + 1);
}

/* get The cookie valude decoded */
jQueryextendedjsoncookieUtils.getCookieValueDecoded = function(argss)
{
  var cookievalue = jQueryextendedjsoncookieUtils.getCookieValue(argss);
  if (cookievalue == undefined) {return undefined; };
  return decodeURIComponent(cookievalue);
}


/* Get the value of a cookie by cookie name*/
jQueryextendedjsoncookieUtils.getFullCookie = function(argss)
{
  var cookiename = argss[0];

  var cookieValue = undefined;
  var componentValueOutput = undefined;

  if (document.cookie && document.cookie != '')
  {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++)
    {
      var cookie = jQuery.trim(cookies[i]);
   
      if (cookie.substring(0, cookiename.length + 1) == (cookiename + '='))
      {
        componentValueOutput = cookie;
        break;
      }
    }
  }
  return componentValueOutput;
}

/*
 * Advanced function thar stores Extended attributes (not value).
 * Warning, This function must be called AT THE END OF THE CALLS
 */
jQueryextendedjsoncookieUtils.setExtendedAttributes = function(argss)
{
  var cookiename = argss[0];
  var extendedattributesarray = argss[1];

  var cookvalue = jQueryextendedjsoncookieUtils.getCookieValueDecoded(argss);
  var argstopass = Array(cookiename, cookvalue, extendedattributesarray);

  jQueryextendedjsoncookieUtils.corewritefunction(argstopass);
}

/*
 * Function that gets a variale Value from a cookie
 */
jQueryextendedjsoncookieUtils.getCookieVariable = function(argss)
{
  var cookiename = argss[0];
  var variablename = argss[1];

  var cookvalue = jQueryextendedjsoncookieUtils.getCookieValueDecoded(argss);
  if (cookvalue != '' && cookvalue != undefined)
  {
    jsonoutput_eval = $.evalJSON(cookvalue);
    return jsonoutput_eval[variablename];
  }

  return undefined;
}


/*
 * Advanced function that stores a variable in the value of the cookie in Json data exchange format
 */
jQueryextendedjsoncookieUtils.setCookieVariable = function(argss)
{
  var cookiename = argss[0];
  var variablename = argss[1];
  var variablevalue = argss[2];

  var jsonoutput = undefined;

  // First, get the cookie value
  var cookvalue = jQueryextendedjsoncookieUtils.getCookieValueDecoded(Array(cookiename));

  // if cookie value is undefined, write empty cookie then set the variable
  if ( (cookvalue == undefined) || (cookvalue == '') )
  {
    jQueryextendedjsoncookieUtils.writeEmptyCookie(Array(cookiename));

    var variableunique = new Object();
    variableunique[variablename] = variablevalue;

    var chainejsonencoded = $.toJSON(variableunique);

    var argstopass = new Array();
    argstopass.push(cookiename);
    argstopass.push(chainejsonencoded);

    jQueryextendedjsoncookieUtils.writeCookie(argstopass);
  }
  else
  {
    // else, add the variable to the cookie
    jsonoutput_eval = $.evalJSON(cookvalue);
    jsonoutput_eval[variablename] = variablevalue;
    var chainejsonencoded = $.toJSON(jsonoutput_eval);

    var argstopass = new Array();
    argstopass.push(cookiename);
    argstopass.push(chainejsonencoded);

    jQueryextendedjsoncookieUtils.writeCookie(argstopass);
  }
}





// JQuery Interface
// We assume that first argument is method name....
jQuery.extendedjsoncookie = function()
{
  // We forge dynamic call chain
  var chain = "jQueryextendedjsoncookieUtils.";
  var internalargs = new Array();
  for (var i=0; i < arguments.length; i++)
  {
     var thisarg = arguments[i];
     if (i == 0)
     {
       chain = chain + thisarg;
     }
     else
     {
       internalargs.push(thisarg);
     }
  }
  
  // We make an eval on it
  return eval(chain) ( internalargs );
};


