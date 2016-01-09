;(function($){

    $.fn.flyDrawer = function(){
        init(this);
    };

    var search = {
        $el : {
            container : null,
            input : null,
            button : null,
            body : $('body')
        },
        blockToggle : false,
        isOpen : false
    };

    // todo: make unecessary
    function onNavClick(e){
        console.log("click:nav");
        e.stopPropagation();
    }

    function onFieldBlur(e){

        var $tgt=$(e.target);
        if( $tgt.is(search.$el.container) || $tgt.is(search.$el.input) ) return;

        console.log('toggle:blur');
        if(!search.isOpen || search.blockToggle) return;

        toggleDrawer();
    }

    function init($el){
        //console.log('init');

        search.$el.container = $('.search-box'); // $el
        search.$el.input = $('.search-input'); // generate
        search.$el.button = $('.icon-search'); // [data-flydrawer]

        setUpEvents();

        function setUpEvents(){

            //$('nav').on('click', onNavClick);
            search.$el.button.on('click', toggleDrawer.bind(this));

            function addBlurEvent(){
                console.log('add blur');
               // search.$el.input.eq(0).focus();
                $(document).on('click', onFieldBlur);
            }
            function removeBlurEvent(){
                console.log('remove blur');
                search.$el.input.off('blur');
            }

            search.$el.input.on('focus', addBlurEvent); //fly:finishedOpening
            search.$el.container.on('fly:finishedClosing', removeBlurEvent);


            function mirror(){ $('.search-mimic span').html($(this).val()); }
            function monitorForEscape(e){
                if (e.keyCode != 27) return;

                toggleDrawer();
            }

            search.$el.input.on('keydown', mirror);
            search.$el.input.on('keyup', mirror);
            search.$el.input.on('keyup', monitorForEscape);

        }

    }

    function toggleDrawer(e){

        //console.log('throttle');

        if(search.$el.body.hasClass('search-results')){
            this.blockToggle = true;
            return;
        }

        if(search.blockToggle) return;

        search.blockToggle = true;

        doToggle(e).then(function(){
            search.blockToggle = false;

            if(search.isOpen){
                search.$el.container.trigger('fly:finishedOpening');
            }else{
                search.$el.container.trigger('fly:finishedClosing');
            }
        });

        return;

        function doToggle(e){
            // console.log('toggle');
            //if(e) console.log(e.target);

            var $deferred = new $.Deferred();

            var isOpening = !search.isOpen;

            if(isOpening){
                search.$el.container.removeClass('closed'); //refactr css
                search.$el.button.addClass('open'); //refactr css
                search.$el.body.addClass('search-open');

                search.$el.input.eq(0).focus();
            }else{
                search.$el.container.addClass('closed');
                search.$el.button.removeClass('open');
                search.$el.body.addClass('search-open');
            }


            setTimeout(function(){
                search.isOpen = isOpening;
                $deferred.resolve();
            }.bind(this), 600); //needed?

            return $deferred;
        }
    }

})(jQuery);

