

// ------- NAVIGATION -------

const get = element => document.getElementById(element);

let open = get("menu-btn");
let nav = get("nav");
let exit = get("exit-btn");

open.addEventListener('click', ()=> {
    nav.classList.add('open-nav');
})

exit.addEventListener('click', ()=> {
    nav.classList.remove('open-nav');
})


// -------- ALL RECIPES ---------

	
	$.getJSON('/pages/data.json', function(data) {
		var output = '<div class="cards">';
		$.each(data, function(key, val) {
				output += '<h3>' + val.cocktailname + '</h3>';
                output += '<ul>';
                output += '<li>' + val.recipe + '</li>';
                output += '<li>' + val.prep + '</li>';
                output += '<li>' + 'Served: ' + val.served + '</li>';
                output += '<li>' + 'Garnished with: ' +  val.garnish + '</li>';
                output += '</ul>';

			});
		output += '</div>';
		$('#cards').html(output);
	}); //get JSON

// //---------- SEARCH PAGE ---------

$('#searchInfo').keyup(function() {
    var searchField = $('#searchInfo').val();
    var myExp = new RegExp(searchField, "i");
    $.getJSON('/pages/data.json', function(data) {
        var output = '<ul class="searchresults">';
        $.each(data, function(key, val) {
            if ((val.cocktailname.search(myExp) != -1) || (val.recipe.search(myExp) != -1)) {
                output += '<h3>' + val.cocktailname + '</h3>';
                output += '<ul class="searchCards">';
                output += '<li>' + val.recipe + '</li>';
                output += '<li>' + val.prep + '</li>';
                output += '<li>' + 'Served: ' + val.served + '</li>';
                output += '<li>' + 'Garnished with: ' +  val.garnish + '</li>';
                output += '</ul>';
            }
        });
        output += '</ul>';
        $('#update').html(output);
    }); //get JSON

});

//-------- GSAP --------

gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(SplitText, ScrollTrigger);

let split
let animation = gsap.timeline({repeat:-1, yoyo:true, repeatDelay:0.3})

function init() {
	gsap.set(".title", {autoAlpha:1})
	split = new SplitText(".title", {type:"chars"})
	animation.from(split.chars, {opacity:0, y:25, ease:"back(4)", stagger:0.05})
	// GSDevTools.create({animation:animation})
}

window.addEventListener("load", init);

gsap.to("label", {
    text:{
        value:"Request info about a cocktail...",
        delimiter: "",}, //no space effect enters letter by letter
        // text:{
        //     value:"welcome to the typewriter effect with GSAP 3",
        //     delimiter: " ",}, with a single space the effect enters word by word
        ease:"power1.in", 
        duration: 2, 
        repeat:-1, 
        yoyo:true, 
        repeatDelay:0.3
    });

//--------------FOOTER-------------

function MM_swapImgRestore() { //v3.0
    var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
  }
  function MM_preloadImages() { //v3.0
    var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
      var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
      if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
  }
  
  function MM_findObj(n, d) { //v4.01
    var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
      d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
    if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
    for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
    if(!x && d.getElementById) x=d.getElementById(n); return x;
  }
  
  function MM_swapImage() { //v3.0
    var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
     if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
  }