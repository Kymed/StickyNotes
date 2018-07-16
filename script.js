
$(document).ready(function(){
  var stickies = [];
  var currentMousePos = { x: -1, y: -1 };
  var stickyWidth = 250;
  var stickyHeight = 150;

  // Create a new sticky
  function Sticky(x, y) {
    // Create sticky data
    var me = this;
    this.x = x;
    this.y = y;
    this.text = "";

    this.red = Math.floor((Math.random() * 180) + 60);
    this.green = Math.floor((Math.random() * 225) + 100);
    this.blue = Math.floor((Math.random() * 225) + 100);
    this.redtop = this.red - 60;
    this.greentop = this.green - 60;
    this.bluetop = this.blue - 60;

    this.div = "#" + stickies.length.toString();
    this.topdiv = "#" + stickies.length.toString() + "top";
    this.bottomdiv ="#" + stickies.length.toString() + "text";
    this.closebtn = "#" + stickies.length.toString(); + "close";
    this.text = "#" + stickies.length.toString(); + "p";

    // Create sticky html div
    let newhtmlsticky = "<div class='sticky' id='" + stickies.length + "'></div>";
    $(newhtmlsticky).appendTo('body');

    // Add sticky css properties
    $(this.div).attr("class", "sticky")
    $(this.div).css("left", this.x + "px");
    $(this.div).css("top", this.y + "px");
    $(this.div).css("width", stickyWidth + "px");
    $(this.div).css("min-height", stickyHeight + "px");
    let cssstickycolor = "rgb(" + this.red + ", " + this.green+ ", " + this.blue + ")";
    $(this.div).css("background-color", cssstickycolor);

    // Create menu div
    let menudiv = "<div id='" + stickies.length + "top'></div>";
    $(menudiv).appendTo("#" + stickies.length);
    $(this.topdiv).attr("class", "topdiv");
    $(this.topdiv).css("width", stickyWidth + "px");
    let csstopcolor = "rgb(" + this.redtop + ", " + this.greentop + ", " + this.bluetop + ")";
    $(this.topdiv).css("background-color", csstopcolor);

    // Add menu buttons
    let addbutton = "<button id='" + stickies.length + "addbtn' class='ui button'>Add Text</button>";
    let bsbutton = "<button id='" + stickies.length + "bsbtn' class='ui button'>Backspace</button>";
    addbutton = $(addbutton); bsbutton = $(bsbutton);
    addbutton.appendTo(this.topdiv);
    bsbutton.appendTo(this.topdiv);
    addbutton.attr("class", "menubtn");
    bsbutton.attr("class", "menubtn");

    // Create text div
    let textdiv = "<div id='" + stickies.length + "text'></div";
    $(textdiv).appendTo("#" + stickies.length);
    $(this.bottomdiv).attr("class", "textdiv");
    $(this.bottomdiv).css("width", stickyWidth + "px");
    let textp = "<p id='" + stickies.length + "p'></p>";
    let texter = $(textp);
    texter.css("font-family", "Helvetica");
    texter.appendTo(this.bottomdiv);

    // Create close button
    //let closebtndiv = "<div id='" + stickies.length + "close'></div>";
    let closebtnimg = "<img src='x.png' style='float:right;'></img>";
    let closer = $(closebtnimg);
    closer.attr("class", "closebtn");
    closer.appendTo(this.topdiv);

    // Create sticky dragging functionality
    var dx, dy;
    var canSetD = true;

    // if mouse is released, escape sticky dragging mode
    $(document).mouseup(function(){
      canSetD = true;
      $(document).off("mousemove");

    });

    // engage sticky dragging mode
    $(this.topdiv).mousedown(function(){
      if (canSetD) {
        dx = event.pageX - parseInt($(me.div).css("left"));
        dy = event.pageY - parseInt($(me.div).css("top"));
        canSetD = false;
      }
      $(document).on("mousemove", function(event){
        let newx = event.pageX - dx;
        let newy = event.pageY - dy;
        $(me.div).css("left", newx + "px");
        $(me.div).css("top", newy + "px");
      });
    });

    // make the close button work
    closer.click(function(){
      $(me.div).remove();
    });

    // Add text button functionality
    addbutton.click(function(){
      let input = prompt("Enter notes to add to sticky");
      if (input != null) {
        texter.text(texter.text() + input);
      }
    });

    // Add backspace button functionality
    bsbutton.click(function(){
      if (texter.text().length > 0) {
        texter.text(texter.text().slice(0, -1));
      }
    });

  }

  $("#clickspace").dblclick(function(event) {
    stickies.push(new Sticky(event.pageX, event.pageY));
  });
});
