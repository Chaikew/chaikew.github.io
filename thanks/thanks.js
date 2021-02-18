function parse_query_string(query) {
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      var key = decodeURIComponent(pair[0]);
      var value = decodeURIComponent(pair[1]);
      // If first entry with this name
      if (typeof query_string[key] === "undefined") {
        query_string[key] = decodeURIComponent(value);
        // If second entry with this name
      } else if (typeof query_string[key] === "string") {
        var arr = [query_string[key], decodeURIComponent(value)];
        query_string[key] = arr;
        // If third or later entry with this name
      } else {
        query_string[key].push(decodeURIComponent(value));
      }
    }
    return query_string;
  }
  
  var parsed_qs = parse_query_string(window.location.search);

  var thanks = document.createElement('H2');
  thanks.className = "owo hoverScale";

  if (parsed_qs.permissions ==! 8) {
    thanks.innerHTML = `Warning, to proper bot work you may need to put him administrator`; 
  }else {
    thanks.innerHTML = `Enjoy the bot !`;
  }

  document.getElementById('container').appendChild(thanks);
