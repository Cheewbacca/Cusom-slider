try {
       
    var names_to_slider_info = $(".names-to_slider_info li");

    var names = [];
 
    // get all names from html 
 
     names_to_slider_info.each(function(){
         var testtext = $(this).text();
         names.push(testtext.trim());
     });
  
    var tags_to_slider_info = $(".tags-to_slider_info");
 
    var tags = [];
    var tags_to_projects = [];
    var tags_tmp;
 
     // get all portfolio projects tags from cms 
 
     for( var i = 0 ; i < tags_to_slider_info.children("li").size(); i++){
         $(tags_to_slider_info.children("li")[i]).children("ul").children("li").each(
             function(){
                 tags_tmp = $(this).text();
                 tags_to_projects.push(tags_tmp.trim());
             }
         );
         tags.push(tags_to_projects);
         tags_to_projects = [];
     }
  
     // get all portfolio projects backgrounds from cms 
 
     var backgrounds_to_slider_info = $(".backgrounds-to_slider_info li");
 
    var backgrounds = [];
 
     backgrounds_to_slider_info.each(function(){
         bgkTemp = $(this).text().trim();
         console.log(" slide: " + bgkTemp);
         backgrounds.push(bgkTemp);
     });
  
    var pictures_to_slider_info = $(".pictures-to_slider_info li");
 
    var pictures = [];
 
    // get all portfolio projects pictures from cms 
 
     pictures_to_slider_info.each(function(){
         pictures.push($(this).text());
     });
  
     // create slide object with all properties [name, tags, hrefs, picture]
 
    var custom_slider_imgs = [];
 
    for (var i = 0 ; i < tags_to_slider_info.children("li").size(); i++){
         custom_slider_imgs.push(
             {
                 name : names[i], // this slide name
                 tags : tags[i], // this slide tags list
                 picture : pictures[i], // this slide picture 
                 bg : backgrounds[i] // this slide background 
             }
         );
    }
 
    var projects_custom_slider_prev = $("#projects_custom_slider-prev"); 
     var projects_custom_slider_next = $("#projects_custom_slider-next");
 
     var main_project = $("#main_project");
     var current_project = $("#current_project");
     var next_project = $("#next_project");
 
     var currentSlide = $(".projects_custom_slider-img_block");
 
     var custom_slider_slides = [main_project, current_project, next_project]; // 3 visible slides
 
     var slider_name = $(".project_name");
 
     var slider_tags = $(".slider_tags");
 
     // generate href from tag name
 
     function getTagsHrefs(tag){
         // pass
     }
 
     // Set hrefs for 2 next slides
 
     function changeSmallSlidesHrefs(){
         current_project.parent("a").attr("href", custom_slider_imgs[1].name.toLowerCase());
         next_project.parent("a").attr("href",  custom_slider_imgs[2].name.toLowerCase());
     }
 
     // set properties for first slide
     
     function setNewName(){
         slider_name.text(custom_slider_imgs[0].name);
         slider_name.attr("href", custom_slider_imgs[0].name.toLowerCase());
     }
 
     // Change slides
 
     function changeTags() {
         slider_tags.children().remove();
         for(var j = 0; j < custom_slider_imgs[0].tags.length; j++){
             slider_tags.append("<li><a class='font-body-3' href='" + getTagsHrefs(custom_slider_imgs[0].tags[j]) +  "'>" + custom_slider_imgs[0].tags[j] + "</a></li>");
         }
     }
 
     // Change images 
 
     function changeImages() {
         currentSlide.css("background-image", "url(" + custom_slider_imgs[0].bg + ")" );
         for (var i = 0; i < custom_slider_slides.length; i++){
             custom_slider_slides[i].attr("src", custom_slider_imgs[i].picture );
             custom_slider_slides[i].parent("a").parent().css("background-image", "url(" + custom_slider_imgs[i].bg + ")" );
         }
     }
 
     // on slide change
 
     function changeSlideAnimation() {
         changeSmallSlidesHrefs();
         setNewName();
         changeTags();
         changeImages();
         currentSlide.css("transform", "translate(0)");
     }
 
     // Animation for 2 next small slides
 
     function changeNextSlides (slide) {
         slide.animate({
             opacity: 0
         }, 500, 
         function(){
             slide.animate(
                 {
                     opacity : 1
                 }, 
                 500
             );
         });
     }
 
     // Get objects to make next slide
 
     function nextSlide() {
         custom_slider_imgs.push(custom_slider_imgs[0]);
         custom_slider_imgs.shift();
 
         currentSlide.css("transform", "translate(-200%)");
 
         setTimeout( changeSlideAnimation , 500);
 
         changeNextSlides(current_project.parent("a").parent());
         changeNextSlides(next_project.parent("a").parent());
     }
 
     // Get objects to make prev slide
 
     function prevSlide() {
         custom_slider_imgs.unshift(custom_slider_imgs[custom_slider_imgs.length - 1]);
         custom_slider_imgs.pop();
 
         currentSlide.css("transform", "translate(-200%)");
 
         setTimeout( changeSlideAnimation , 500);
         changeNextSlides(current_project);
         changeNextSlides(next_project);
     }
 
     var progress = $(".progress");
 
     // Progress anamation
 
     var progressAnimation = function(){ 
         progress.animate(
             { width: "100%"},
             5000,
             'linear', 
             function() {
                 progress.css("width", "0%");
                 progressAnimation();
             }
         );
     };
 
     var timer; // get timer for progress bar
 
     // Go to the next slide
 
     var nextSlideTimeout = function() {
         timer = setInterval(nextSlide , 5000);
     };
 
     // Start slider
 
     setNewName();
 
     changeTags();
 
     changeImages();
 
     changeSmallSlidesHrefs();
 
     progressAnimation();
 
     nextSlideTimeout();
 
     // Next slide
 
     projects_custom_slider_next.on("click", function(e){
         e.preventDefault();
         nextSlide(); // choose visible objects
         clearInterval(timer); // clear timeout for auto slide changing
         nextSlideTimeout(); // change slide
         progress.stop(); 
         progress.css("width", "0%");
         progressAnimation(); // start progress bar
     });
 
     // Prev Slide
 
     projects_custom_slider_prev.on("click", function(e){
         e.preventDefault();
         prevSlide(); // choose visible objects
         clearInterval(timer); // clear timeout for auto slide changing
         nextSlideTimeout(); // change slide
         progress.stop();
         progress.css("width", "0%");
         progressAnimation(); // start progress bar
     });
 
    // End of the custom slide code section !
   }catch(e){
       console.log(e);
   }