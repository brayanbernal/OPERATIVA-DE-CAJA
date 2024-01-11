createAccordions = function () {
    $("div.metro-accordion").children("h3").each(function () {
        $(this).addClass("accordionTitle").next().addClass("accordionContent").hide();
        $(this).prepend("<img class='accordionArrow' src='themes/" + theme + "/img/primary/arrowRight.png'/>");

    });
    if (!$("div.metro-accordion").hasClass("no-memory")) {
        for (var i = 1; i < $hashed.parts.length; i++) {
            if ($hashed.parts[i].substr(0, 4) == "acc=") {
                var t = $hashed.parts[i].substr(4);
                $("div.metro-accordion").children("h3").each(function () {
                    if ($(this).text().toLowerCase() == t) {
                        $(this).next().slideDown(500);
                        if ($.browser.name == "msie" && $.browser.version < 9) {
                            $(this).children("img").attr("src", "themes/" + theme + "/img/primary/arrowBottom.png")
                        } else if ($.layout.name == "webkit") {
                            r = 89;
                            $accordion.turnImageDown($(this).children("img"));
                        } else {
                            $(this).children("img").removeClass('right').addClass("down");
                        }
                        if (!$("div.metro-accordion").hasClass("no-scrollto")) {

                            setTimeout(function (el) {
                                var t = 0;
                                if (!scrollHeader) {
                                    t = $("header").height() + 30;
                                }
                                $("html,body").animate({ scrollTop: $(el).offset().top - t }, 500)

                            }, 500, this);
                        }
                        return false;
                    }
                });
                break;
            }
        }
        setTimeout("$hashed.doRefresh = true", 500);
    }
    $("#content, #panelContent").children("div.metro-accordion").on("click", "h3", function () {
        var $c = $(this).next(),
            $d = $(this).parent();
        if ($c.css("display") == "none") {
            if ($d.hasClass("hide-others")) {
                $d.children("div").stop().slideUp(500);
                $d.children("h3").children("img").attr("src", "themes/" + theme + "/img/primary/arrowRight.png").removeClass('down').addClass("right");
                if ($.layout.name == "webkit") {
                    r = 0;
                    $accordion.turnImageRight($d.children("h3").children("img"));
                }
            }
            $c.stop().slideDown(500);
            if ($.browser.name == "msie" && $.browser.version < 9) {
                $(this).children("img").attr("src", "themes/" + theme + "/img/primary/arrowBottom.png")
            } else if ($.layout.name == "webkit") {
                r = 0;
                $accordion.turnImageDown($(this).children("img"));
            } else {
                $(this).children("img").removeClass('right').addClass("down");
            }
            if (!$d.hasClass("no-scrollto")) {
                var t = 0;
                if (!scrollHeader) {
                    t = $("header").height() + 30;
                }
                $("html,body").animate({ scrollTop: $(this).offset().top - t }, 500);
            }
            if (!$d.hasClass("no-memory")) {
                $hashed.doRefresh = false;
                for (var i = 1; i < $hashed.parts.length; i++) {
                    if ($hashed.parts[i].substr(0, 4) == "acc=") {
                        $hashed.parts.splice(i, 1);
                        window.location.hash = $hashed.parts.join("&");
                        break;
                    }
                }
                window.location.hash += "&acc=" + $(this).text().toLowerCase();
                setTimeout("$hashed.doRefresh = true", 500);
            }
        } else {
            $c.stop().slideUp(500);
            if ($.browser.name == "msie" && $.browser.version < 9) {
                $(this).children("img").attr("src", "themes/" + theme + "/img/primary/arrowRight.png")
            } else if ($.layout.name == "webkit") {
                r = 90;
                $accordion.turnImageRight($(this).children("img"));
            } else {
                $(this).children("img").removeClass('down').addClass("right");
            }
            if (!$d.hasClass("no-memory")) {
                $hashed.doRefresh = false;
                for (var i = 1; i < $hashed.parts.length; i++) {
                    if ($hashed.parts[i].substr(0, 4) == "acc=") {
                        $hashed.parts.splice(i, 1);
                        window.location.hash = $hashed.parts.join("&");
                        break;
                    }
                }
                setTimeout("$hashed.doRefresh = true", 500);
            }
        }
    });
}
$.plugin($beforeSubPageShow, {
    accordion: function () {
        createAccordions();
    }
});
$accordion = {
    turnImageDown: function (img) {
        r += 9;
        $accordion.turn(img, r);
        if (r < 90) { setTimeout(function () { $accordion.turnImageDown(img) }, 40) } else { setTimeout(function () { $accordion.turn(img, 90) }, 40) }
    },
    turnImageRight: function (img) {
        r -= 9;
        $accordion.turn(img, r);
        if (r > 0) { setTimeout(function () { $accordion.turnImageRight(img) }, 40) } else { setTimeout(function () { $accordion.turn(img, 0) }, 40) }
    },
    turn: function (img, r) {
        img.css("transform", "rotate(" + r + "deg)").css("-webkit-transform", "rotate(" + r + "deg)")
    }
}
minZoomScale = 0.8 // CHANGE TO YOUR LIKING -> lower is smaller!

zoomScale = 1
$.plugin($windowResizeEnd, {
    resizeTiles: function () {
        setTimeout(function () {
            if ($page.current == "home" && $page.layout != "column") {
                tcH = $("#tileContainer").height();
                tcMargin = parseInt($("#wrapper").css("padding-top")) + parseInt($("#centerWrapper").css("margin-bottom")) + 35
                zoomScale = Math.abs(($(window).height() - tcMargin) / tcH)

                if (zoomScale >= 1) {
                    zoomScale = 1;
                    if ($.browser.name == "opera" || $.browser.name == "mozilla") {
                        $("#tileContainer").css("-moz-transform", "none").css("-o-transform", "none");
                    } else {
                        $("#tileContainer").css('zoom', 1)
                    }
                } else {
                    zoomScale = (zoomScale < minZoomScale) ? minZoomScale : zoomScale;
                    if ($.browser.name == "opera" || $.browser.name == "mozilla") {
                        $("#tileContainer").css("-moz-transform", "scale(" + zoomScale + ")").css("-o-transform", "scale(" + zoomScale + ")");
                    } else {
                        $("#tileContainer").css('zoom', zoomScale)
                    }
                }
            } else {
                $("#tileContainer").css('zoom', 1);
            }
        }, 1000);
    }
});

// Generated by CoffeeScript 1.4.0

/*
Lightbox v2 (Last modified on 2013-02-11 09:34:36)
by Lokesh Dhakar - http://www.lokeshdhakar.com
MODDED by Cain Wong (Auto-resize feature)

For more information, visit:
http://lokeshdhakar.com/projects/lightbox2/

Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
- free for use in both personal and commercial projects
- attribution requires leaving author name, author link, and the license info intact
	
Thanks
- Scott Upton(uptonic.com), Peter-Paul Koch(quirksmode.com), and Thomas Fuchs(mir.aculo.us) for ideas, libs, and snippets.
- Artemy Tregubenko (arty.name) for cleanup and help in updating to latest proto-aculous in v2.05.


Table of Contents
=================
LightboxOptions

Lightbox
- constructor
- init
- enable
- build
- start
- changeImage
- sizeContainer
- showImage
- updateNav
- updateDetails
- preloadNeigbhoringImages
- enableKeyboardNav
- disableKeyboardNav
- keyboardAction
- end

options = new LightboxOptions
lightbox = new Lightbox options
*/

$(document).ready(function () {
    (function () {
        var $, Lightbox, LightboxOptions;

        $ = jQuery;

        LightboxOptions = (function () {

            function LightboxOptions() {
                this.fileLoadingImage = 'plugins/lightbox/img/loading.gif';
                this.fileCloseImage = 'plugins/lightbox/img/close.png';
                this.resizeDuration = 700;
                this.fadeDuration = 500;
                this.labelImage = "Image";
                this.labelOf = "of";
            }

            return LightboxOptions;

        })();

        Lightbox = (function () {

            function Lightbox(options) {
                this.options = options;
                this.album = [];
                this.currentImageIndex = void 0;
                this.init();
            }

            Lightbox.prototype.init = function () {
                this.enable();
                return this.build();
            };

            Lightbox.prototype.enable = function () {
                var _this = this;
                return $('body').on('click', 'a[class*=lightbox], area[class*=lightbox]', function (e) {//return $('body').on('click', 'a[rel^=lightbox], area[rel^=lightbox]', function(e) {
                    _this.start($(e.currentTarget));
                    return false;
                });
            };

            Lightbox.prototype.build = function () {
                var $lightbox,
                  _this = this;
                $("<div id='lightboxOverlay'></div><div id='lightbox'><div class='lb-outerContainer'><div class='lb-container'><img class='lb-image' src='' ><div class='lb-nav'><a class='lb-prev' href='' ></a><a class='lb-next' href='' ></a></div><div class='lb-loader'><a class='lb-cancel'><img src='" + this.options.fileLoadingImage + "'></a></div></div></div><div class='lb-dataContainer'><div class='lb-data'><div class='lb-details'><span class='lb-caption'>captioncaption</span><span class='lb-number'></span></div><div class='lb-closeContainer'><a class='lb-close'><img src='" + this.options.fileCloseImage + "'></a></div></div></div></div>").appendTo($('body'));
                $('#lightboxOverlay').hide().on('click', function (e) {
                    _this.end();
                    return false;
                });
                $lightbox = $('#lightbox');
                $lightbox.hide().on('click', function (e) {
                    if ($(e.target).attr('id') === 'lightbox') {
                        _this.end();
                    }
                    return false;
                });
                $lightbox.find('.lb-outerContainer').on('click', function (e) {
                    if ($(e.target).attr('id') === 'lightbox') {
                        _this.end();
                    }
                    return false;
                });
                $lightbox.find('.lb-prev').on('click', function (e) {
                    _this.changeImage(_this.currentImageIndex - 1);
                    return false;
                });
                $lightbox.find('.lb-next').on('click', function (e) {
                    _this.changeImage(_this.currentImageIndex + 1);
                    return false;
                });
                $lightbox.find('.lb-loader, .lb-close').on('click', function (e) {
                    _this.end();
                    return false;
                });
            };

            Lightbox.prototype.start = function ($link) {
                var $lightbox, $window, a, i, imageNumber, left, top, _i, _len, _ref;
                $(window).on("resize", this.sizeOverlay);
                $('select, object, embed').css({
                    visibility: "hidden"
                });
                $('#lightboxOverlay').width($(document).width()).height($(document).height()).fadeIn(this.options.fadeDuration);
                this.album = [];
                imageNumber = 0;
                if (($link.attr('class')).indexOf('lightbox') != -1) {//tutaj if ($link.attr('class') === 'lightbox') {
                    this.album.push({
                        link: $link.attr('href'),
                        title: $link.attr('title')
                    });
                } else {
                    _ref = $($link.prop("tagName") + '[class="' + $link.attr('class') + '"]');
                    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
                        a = _ref[i];
                        this.album.push({
                            link: $(a).attr('href'),
                            title: $(a).attr('title')
                        });
                        if ($(a).attr('href') === $link.attr('href')) {
                            imageNumber = i;
                        }
                    }
                }
                $window = $(window);
                top = $window.scrollTop() + $window.height() / 10;
                left = $window.scrollLeft();
                $lightbox = $('#lightbox');
                $lightbox.css({
                    top: top + 'px',
                    left: left + 'px'
                }).fadeIn(this.options.fadeDuration);
                this.changeImage(imageNumber);
            };

            Lightbox.prototype.changeImage = function (imageNumber) {
                var $image, $lightbox, preloader,
                  _this = this;
                this.disableKeyboardNav();
                $lightbox = $('#lightbox');
                $image = $lightbox.find('.lb-image');
                this.sizeOverlay();
                $('#lightboxOverlay').fadeIn(this.options.fadeDuration);
                $('.loader').fadeIn('slow');
                $lightbox.find('.lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption').hide();
                $lightbox.find('.lb-outerContainer').addClass('animating');
                preloader = new Image;
                preloader.onload = function () {
                    $image.attr('src', _this.album[imageNumber].link);
                    if (preloader.width > window.innerWidth * 0.9) {
                        preloader.height = (window.innerWidth * 0.9 * preloader.height) / preloader.width;
                        preloader.width = window.innerWidth * 0.9;
                    }
                    if (preloader.height > window.innerHeight * 0.8) {
                        preloader.width = (window.innerHeight * 0.8 * preloader.width) / preloader.height;
                        preloader.height = window.innerHeight * 0.8;
                    }
                    $image.width = preloader.width;
                    $image.height = preloader.height;
                    $image.attr('width', preloader.width + "px");
                    return _this.sizeContainer(preloader.width, preloader.height);
                };
                preloader.src = this.album[imageNumber].link;
                this.currentImageIndex = imageNumber;
            };

            Lightbox.prototype.sizeOverlay = function () {
                return $('#lightboxOverlay').width($(document).width()).height($(document).height());
            };

            Lightbox.prototype.sizeContainer = function (imageWidth, imageHeight) {
                var $container, $lightbox, $outerContainer, containerBottomPadding, containerLeftPadding, containerRightPadding, containerTopPadding, newHeight, newWidth, oldHeight, oldWidth,
                  _this = this;
                $lightbox = $('#lightbox');
                $outerContainer = $lightbox.find('.lb-outerContainer');
                oldWidth = $outerContainer.outerWidth();
                oldHeight = $outerContainer.outerHeight();
                $container = $lightbox.find('.lb-container');
                containerTopPadding = parseInt($container.css('padding-top'), 10);
                containerRightPadding = parseInt($container.css('padding-right'), 10);
                containerBottomPadding = parseInt($container.css('padding-bottom'), 10);
                containerLeftPadding = parseInt($container.css('padding-left'), 10);
                newWidth = imageWidth + containerLeftPadding + containerRightPadding;
                newHeight = imageHeight + containerTopPadding + containerBottomPadding;
                if (newWidth !== oldWidth && newHeight !== oldHeight) {
                    $outerContainer.animate({
                        width: newWidth,
                        height: newHeight
                    }, this.options.resizeDuration, 'swing');
                } else if (newWidth !== oldWidth) {
                    $outerContainer.animate({
                        width: newWidth
                    }, this.options.resizeDuration, 'swing');
                } else if (newHeight !== oldHeight) {
                    $outerContainer.animate({
                        height: newHeight
                    }, this.options.resizeDuration, 'swing');
                }
                setTimeout(function () {
                    $lightbox.find('.lb-dataContainer').width(newWidth);
                    $lightbox.find('.lb-prevLink').height(newHeight);
                    $lightbox.find('.lb-nextLink').height(newHeight);
                    _this.showImage();
                }, this.options.resizeDuration);
            };

            Lightbox.prototype.showImage = function () {
                var $lightbox;
                $lightbox = $('#lightbox');
                $lightbox.find('.lb-loader').hide();
                $lightbox.find('.lb-image').fadeIn('slow');
                this.updateNav();
                this.updateDetails();
                this.preloadNeighboringImages();
                this.enableKeyboardNav();
            };

            Lightbox.prototype.updateNav = function () {
                var $lightbox;
                $lightbox = $('#lightbox');
                $lightbox.find('.lb-nav').show();
                if (this.currentImageIndex > 0) {
                    $lightbox.find('.lb-prev').show();
                }
                if (this.currentImageIndex < this.album.length - 1) {
                    $lightbox.find('.lb-next').show();
                }
            };

            Lightbox.prototype.updateDetails = function () {
                var $lightbox,
                  _this = this;
                $lightbox = $('#lightbox');
                if (typeof this.album[this.currentImageIndex].title !== 'undefined' && this.album[this.currentImageIndex].title !== "") {
                    $lightbox.find('.lb-caption').html(this.album[this.currentImageIndex].title).fadeIn('fast');
                }
                if (this.album.length > 1) {
                    $lightbox.find('.lb-number').html(this.options.labelImage + ' ' + (this.currentImageIndex + 1) + ' ' + this.options.labelOf + '  ' + this.album.length).fadeIn('fast');
                } else {
                    $lightbox.find('.lb-number').hide();
                }
                $lightbox.find('.lb-outerContainer').removeClass('animating');
                $lightbox.find('.lb-dataContainer').fadeIn(this.resizeDuration, function () {
                    return _this.sizeOverlay();
                });
            };

            Lightbox.prototype.preloadNeighboringImages = function () {
                var preloadNext, preloadPrev;
                if (this.album.length > this.currentImageIndex + 1) {
                    preloadNext = new Image;
                    preloadNext.src = this.album[this.currentImageIndex + 1].link;
                }
                if (this.currentImageIndex > 0) {
                    preloadPrev = new Image;
                    preloadPrev.src = this.album[this.currentImageIndex - 1].link;
                }
            };

            Lightbox.prototype.enableKeyboardNav = function () {
                $(document).on('keyup.keyboard', $.proxy(this.keyboardAction, this));
            };

            Lightbox.prototype.disableKeyboardNav = function () {
                $(document).off('.keyboard');
            };

            Lightbox.prototype.keyboardAction = function (event) {
                var KEYCODE_ESC, KEYCODE_LEFTARROW, KEYCODE_RIGHTARROW, key, keycode;
                KEYCODE_ESC = 27;
                KEYCODE_LEFTARROW = 37;
                KEYCODE_RIGHTARROW = 39;
                keycode = event.keyCode;
                key = String.fromCharCode(keycode).toLowerCase();
                if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
                    this.end();
                } else if (key === 'p' || keycode === KEYCODE_LEFTARROW) {
                    if (this.currentImageIndex !== 0) {
                        this.changeImage(this.currentImageIndex - 1);
                    }
                } else if (key === 'n' || keycode === KEYCODE_RIGHTARROW) {
                    if (this.currentImageIndex !== this.album.length - 1) {
                        this.changeImage(this.currentImageIndex + 1);
                    }
                }
            };

            Lightbox.prototype.end = function () {
                this.disableKeyboardNav();
                $(window).off("resize", this.sizeOverlay);
                $('#lightbox').fadeOut(this.options.fadeDuration);
                $('#lightboxOverlay').fadeOut(this.options.fadeDuration);
                return $('select, object, embed').css({
                    visibility: "visible"
                });
            };

            return Lightbox;

        })();

        $(function () {
            var lightbox, options;
            options = new LightboxOptions;
            return lightbox = new Lightbox(options);
        });

    }).call(this);
});
$(document).on("click", "a[href^='panels/']", function (event) {
    event.preventDefault();
    $this = $(this);
    $panel = $("#panel");

    $panel.stop().show().animate({ right: 0 }, 500, "easeOutCubic");
    $("#panelLoader").show()

    if ($("#panel_" + encodeURIComponent($this.attr("href").replace(/./g, "_").replace(/\//g, "_slash-")).replace(/%/g, "_")).length > 0) {
        $("#panelContent, .preloadedPanel, #panelLoader").hide();
        $("#panel_" + encodeURIComponent($this.attr("href").replace(/./g, "_").replace(/\//g, "_slash-")).replace(/%/g, "_")).fadeIn(300);
        if (panelDim) {
            $("#catchScroll").animate({ opacity: panelDim }, 500).css("z-index", 49);
        };
        if (!panelGroupScrolling) {
            scrolling = true;
        }
        transformLinks();
        $events.sidepanelShow();
    } else {
        $.ajax($this.attr("href")).success(function (newContent, textStatus) {
            $("#panelContent, .preloadedPanel").hide()
            $("#panelLoader").fadeOut(200)
            $("#panelContent").html(newContent).fadeIn(300);
            if (panelDim) {
                $("#catchScroll").animate({ opacity: panelDim }, 500).css("z-index", 49);
            };
            if (!panelGroupScrolling) {
                scrolling = true;
            }
            transformLinks();
            $events.sidepanelShow();
        });
    }
    if (hidePanelOnClick) {
        $(document).bind("click.hidepanel", function () {
            hidePanel();
            $(document).unbind("click.hidepanel");
        });
        $panel.click(function (event) {
            event.stopPropagation();
        });
    }

    return false;
});
hidePanel = function () {
    $("#panel").animate({ right: -$("#panel").width() - 20 }, 500, "easeOutCubic", function () {
        $(this).hide();
        if (!panelGroupScrolling) {
            scrolling = false;
        }
    });
    $("#catchScroll").animate({ opacity: 0 }, 500).css("z-index", -1);
    $events.sidepanelHide();
}
/* Plugin JS file */
if ($.browser.name == "msie") {
    $(document).on("mouseenter", ".tileFlip", function () {
        $(this).find(".flipFront, .tileLabelWrapper").stop().fadeOut(500);
    }).on("mouseleave", ".tileFlip", function () {
        $(this).find(".flipFront, .tileLabelWrapper").stop().fadeIn(500);
    })
} else {
    $(document).ready(function () {
        $(".tileFlip").addClass("support3D");
    });
    $(document).on("mouseenter", ".tileFlip", function () {
        $(this).find(".flipFront, .tileLabelWrapper").stop().delay(300).animate({ opacity: 0 }, 0)
    }).on("mouseleave", ".tileFlip", function () {
        $(this).find(".flipFront, .tileLabelWrapper").stop().animate({ opacity: 1 }, 0);
    })

}
/*flip tile 0.1 */
if ($.browser.name == "msie" && $.browser.version < 10) {
    $(document).on("mouseenter", ".tileFlipText", function () {
        $(this).find(".flipFront, .tileLabelWrapper").stop().fadeOut(500);
    }).on("mouseleave", ".tileFlipText", function () {
        $(this).find(".flipFront, .tileLabelWrapper").stop().fadeIn(500);
    })
} else {
    $(document).ready(function () {
        $(".tileFlipText").addClass("support3D");
    });
    $(document).on("mouseenter", ".tileFlipText", function () {
        $(this).find(".flipFront, .tileLabelWrapper").stop().delay(300).animate({ opacity: 0 }, 0)
    }).on("mouseleave", ".tileFlipText", function () {
        $(this).find(".flipFront, .tileLabelWrapper").stop().animate({ opacity: 1 }, 0);
    })
}
$.plugin($afterTilesShow, {
    media: function () {
        $.fn.media.mapFormat('mp3', 'winmedia');
        $('div.media').media({
        });
    }
})
tileMosaicFlip = function (length, r, m, af) {
    var f = false;
    var i = 0;
    var s = 300;
    while (!f) {
        var g = Math.floor((Math.random() * m) + 1);
        if ($.inArray(g, af) == -1) { f = true; }
        i++;
        if (i > length) { f = true; g = 0; }
    }
    af.push(g);
    var $id = $("#tileMosaic" + m + "_" + g);
    var $id_back = $("#tileMosaic" + m + "_" + g + "b");
    if (r == 0) { // if big image is front now
        var margin = $id_back.width() / 2;
        var height = $id_back.width();
        $id_back.css({ height: '' + height + "px", marginTop: '0px' });
        $id.css({ height: '0px', marginTop: '' + margin + 'px' });
        $id_back.animate({ height: '0px', marginTop: '' + margin + 'px' }, 150, function () {
            $id.animate({ height: '' + height + 'px', marginTop: '0px' }, 150);
        });
        if (af.length > length) {
            af = new Array();
            r = 1;
            s = 650;
        }
    } else {
        var margin = $id.width() / 2;
        var height = $id.width();
        $id.css({ height: '' + height + "px", marginTop: '0px' });
        $id_back.css({ height: '0px', marginTop: '' + margin + 'px' });
        $id.animate({ height: '0px', marginTop: '' + margin + 'px' }, 150, function () {
            $id_back.animate({ height: height + 'px', marginTop: '0px' }, 150);
        });
        if (af.length > length) {
            af = new Array();
            r = 0;
            s = 1000;
        }
    }
    setTimeout(function () { tileMosaicFlip(length, r, m, af) }, s);
}
/* Plugin JS file */
$(document).on("mouseenter", ".tileSlide", function () {
    if ($(this).data("doslide")) {

        if ($(this).hasClass("right")) {
            $(this).children('.imageWrapper').stop().animate({ "margin-left": $(this).children(".slideText").width() + 15 }, 400);
            $(this).children(".slideText").stop().animate({ "left": 0 }, 400);
        } else if ($(this).hasClass("left")) {
            $(this).children('.imageWrapper').stop().animate({ "margin-left": -$(this).children(".slideText").width() - 15 }, 400);
            $(this).children(".slideText").stop().animate({ "left": "-=" + ($(this).children(".slideText").width() + 15) }, 400);
        } else if ($(this).hasClass("down")) {
            $(this).children('.imageWrapper').stop().animate({ "margin-top": $(this).children(".slideText").height() + 15 }, 400);
            $(this).children(".slideText").stop().animate({ "top": 0 }, 400);
        } else if ($(this).hasClass("up")) {
            $(this).children('.imageWrapper').stop().animate({ "margin-top": -$(this).children(".slideText").height() - 15 }, 400);
            $(this).children(".slideText").stop().animate({ "top": "-=" + ($(this).children(".slideText").height() + 15) }, 400);
        }
    } else {
        if ($(this).hasClass("right")) {
            $(this).children('.imageWrapper').stop().animate({ "margin-left": $(this).children(".slideText").width() + 15 }, 400);
        } else if ($(this).hasClass("left")) {
            $(this).children('.imageWrapper').stop().animate({ "margin-left": -$(this).children(".slideText").width() - 15 }, 400);
        } else if ($(this).hasClass("down")) {
            $(this).children('.imageWrapper').stop().animate({ "margin-top": $(this).children(".slideText").height() + 15 }, 400);
        } else if ($(this).hasClass("up")) {
            $(this).children('.imageWrapper').stop().animate({ "margin-top": -$(this).children(".slideText").height() - 15 }, 400);
        }
    }

}).on("mouseleave", ".tileSlide", function () {
    $(this).children('.imageWrapper').stop().animate({ "margin-left": 0, "margin-top": 0 }, 400);
    if ($(this).data("doslide")) {
        if ($(this).hasClass("right")) {
            $(this).children(".slideText").stop().animate({ "left": -$(this).children(".slideText").width() }, 400);
        } else if ($(this).hasClass("left")) {
            $(this).children(".slideText").stop().animate({ "left": $(this).width() }, 400);
        } else if ($(this).hasClass("down")) {
            $(this).children(".slideText").stop().animate({ "top": -$(this).children(".slideText").height() }, 400);
        } else if ($(this).hasClass("up")) {
            $(this).children(".slideText").stop().animate({ "top": $(this).height() }, 400);
        }
    }
})
/* Plugin JS file */
is_supported = $.browser.name != "msie" /*&& $.browser.name=="opera"*/;

if (!is_supported) {
    $(document).on("mouseenter", ".tileSlideFx", function () {
        $(this).children('.imgWrapper').stop().animate({ "margin-left": -$(this).width() * 0.4 }, 500);
    }).on("mouseleave", ".tileSlideFx", function () {
        $(this).children('.imgWrapper').stop().animate({ "margin-left": 0 }, 500);
    })
} else {
    $(document).on("mouseenter", ".tileSlideFx", function () {
        $(this).addClass("hovered");
        clearTimeout(timers[$(this)]);
    }).on("mouseleave", ".tileSlideFx", function () {
        timers[$(this)] = setTimeout(function () { $(".tileSlideFx").removeClass("hovered") }, 201);
    })

}
$.plugin($siteLoad, {
    tileSlideFx: function () {
        if (is_supported) {
            $(".tileSlideFx").each(function () {
                var $item = $(this),
				    itemwidth = $item.width(),
					img = $item.find(".imgWrapper").children('img').attr('src'),
					struct = '<div class="slice s1">\
					<div class="slice s2"  style="background-position: -'+ Math.ceil(itemwidth * 0.25) + 'px 0px;">\
					<div class="slice s3" style="background-position: -'+ Math.ceil(itemwidth * 0.5) + 'px 0px;">\
					<div class="slice s4" style="background-position:-'+ Math.ceil(itemwidth * 0.75) + 'px 0px;">\
					</div></div></div></div>';
                $item.children('.imgWrapper').remove().end()
					.append(struct)
					.find('.slice').css("width", Math.ceil(itemwidth * 0.25)).css('background-image', 'url(' + img + ')')
					.prepend('<span class="overlay" style="width:' + Math.ceil(itemwidth * 0.25) + 'px;"></span>')

            });
        } else {
            $(".tileSlideFx").css("overflow", "hidden");
        }
    }
});
/* Plugin JS file */

/*SLIDESHOW TILE*/
slideshowTiles = [];
nextSlideshow = function (id, imgs, alts, texts, effect, s, dir) {
    var $id = $("#" + id);
    if (device == "mobile" || ($page.current == "home" && !scrolling && ($id.hasClass("group" + $group.current) || $id.hasClass("group" + ($group.current + 1)) || $page.layout == "column"))) {
        clearTimeout(timers[id]);
        var n = $id.data("n"); // current image
        if (n < 0) { n = imgs.length - 1 };
        if (n + 1 > imgs.length) { n = 0 }
        if (!dir) {
            dir = 1;
            n = ((n + 2) > imgs.length) ? 0 : n + 1;
        }
        $id.data("n", n)
        var fxarr = effect.split(","),
            fx = (fxarr.length > 1) ? fxarr[Math.floor(Math.random() * fxarr.length)] : fxarr[0],
            $wr = $id.children(".imgWrapper"),
            $img = $wr.children("img"),
            $wrBack = $id.children(".imgWrapperBack"),
            $imgText = $id.children(".imgText");
        $imgBack = $wrBack.children("img"),
        imgSrc = $img.attr("src")
        imgAlt = $img.attr("alt")
        switch ($.trim(fx)) {
            case "slide-right":
                dir = -dir;
            case "slide-left":
                $imgBack.attr("src", imgSrc)
                $imgBack.attr("alt", imgAlt)
                $wrBack.stop(true, true).css("left", 0).css("top", 0).animate({ left: -dir * $img.width() }, 1200, "easeOutCubic").show();

                $img.attr("src", imgs[n])
                $img.attr("alt", alts[n])
                $wr.stop(true, true).css("left", dir * $img.width()).css("top", 0).animate({ left: 0 }, 1200, "easeOutCubic").show();
                break;
            case "slide-hor-alternate":
                if (typeof $id.data("side") == "undefined" || $id.data("side") == 0) { // go ltr
                    $imgBack.attr("src", imgSrc)
                    $imgBack.attr("alt", imgAlt)
                    $wrBack.stop(true, true).css("left", 0).css("top", 0).animate({ left: dir * $id.width() }, 1200, "easeOutCubic").show();
                    $img.attr("src", imgs[n])
                    $img.attr("alt", alts[n])

                    $wr.stop(true, true).css("left", -dir * $id.width()).css("top", 0).animate({ left: 0 }, 1200, "easeOutCubic").show();
                    $id.data("side", 1)
                } else { // go rtl
                    $imgBack.attr("src", imgSrc)
                    $imgBack.attr("alt", imgAlt)
                    $wrBack.stop(true, true).css("left", 0).css("top", 0).animate({ left: -dir * $img.width() }, 1200, "easeOutCubic").show();
                    $img.attr("src", imgs[n]);
                    $img.attr("alt", alts[n])
                    $wrBack.stop(true, true).css("left", dir * $img.width()).css("top", 0).animate({ left: 0 }, 1200, "easeOutCubic").show();
                    $id.data("side", 0)
                }
                break;
            case "slide-down":
                dir = -dir;
            case "slide-up":
                $imgBack.attr("src", imgSrc)
                $imgBack.attr("alt", imgAlt)
                $wrBack.stop(true, true).css("top", 0).css("left", 0).animate({ top: -$id.height() * dir }, 1200, "easeOutCubic").show();
                $img.attr("src", imgs[n])
                $img.attr("alt", alts[n])
                $wr.stop(true, true).css("top", $id.height() * dir).css("left", 0).animate({ top: 0 }, 1200, "easeOutCubic").show();
                break;
            case "slide-ver-alternate":
                if (typeof $id.data("side") == "undefined" || $id.data("side") == 0) { // go ltr
                    $imgBack.attr("src", imgSrc)
                    $wrBack.stop(true, true).css("top", 0).css("left", 0).animate({ top: $id.height() * dir }, 1200, "easeOutCubic").show();
                    $img.attr("src", imgs[n])
                    $wr.stop(true, true).css("top", -$id.height() * dir).css("left", 0).animate({ top: 0 }, 1200, "easeOutCubic").show();
                    $id.data("side", 1)
                } else { // go rtl
                    $imgBack.attr("src", imgSrc)
                    $imgBack.attr("alt", imgAlt)
                    $wrBack.stop(true, true).css("top", 0).css("left", 0).animate({ top: -$id.height() * dir }, 1200, "easeOutCubic").show();
                    $img.attr("src", imgs[n])
                    $img.attr("alt", alts[n])
                    $wr.stop(true, true).css("top", $id.height() * dir).css("left", 0).animate({ top: 0 }, 1200, "easeOutCubic").show();
                    $id.data("side", 0)
                }
                break;
            case "flip-vertical":
                var margin = $id.height() / 2;
                var height = $id.height() + 2;
                var width = $id.width() + 2;
                $imgBack.css({ height: '0px', width: '' + width + 'px', marginTop: '' + margin + 'px', opacity: '0.5' });
                $img.stop(true, false).animate({ height: '0px', width: '' + width + 'px', marginTop: '' + margin + 'px', opacity: '0.5' }, 400, function () {
                    $imgBack.attr("src", imgSrc).attr("alt", imgAlt).animate({ height: '' + height + 'px', width: '' + width + 'px', marginTop: '0px', opacity: '1' }, 400);
                });
                $imgBack.stop(true, false).animate({ height: '0px' }, 400, function () {
                    $img.attr("src", imgs[n]).attr("alt", alts[n]).animate({ height: '' + height + 'px', width: '' + width + 'px', marginTop: '0px', opacity: '1' }, 400);
                });
                break;
            case "flip-horizontal":
                var margin = $id.width() / 2;
                var width = $id.width() + 2;
                var height = $id.height() + 2;
                $imgBack.css({ width: '0px', height: '' + height + 'px', marginLeft: '' + margin + 'px', opacity: '0.5' });
                $img.stop(true, false).animate({ width: '0px', height: '' + height + 'px', marginLeft: '' + margin + 'px' }, 400, function () {
                    $imgBack.attr("src", imgSrc).attr("alt", imgAlt).animate({ width: '' + width + 'px', height: '' + height + 'px', marginLeft: '0px' }, 400);
                });
                $imgBack.stop(true, false).animate({ width: '0px', height: '' + height + 'px', marginLeft: '' + margin + 'px' }, 400, function () {
                    $img.attr("src", imgs[n]).attr("alt", alts[n]).animate({ width: '' + width + 'px', height: '' + height + 'px', marginLeft: '0px' }, 400);
                });
                break;
            default:
            case "fade":

                $imgBack.attr("src", imgSrc)
                $imgBack.attr("alt", imgAlt)
                $wrBack.stop(true, true).show().fadeOut(700)
                $img.attr("src", imgs[n])
                $img.attr("alt", alts[n])
                $wr.stop(true, true).hide().fadeIn(700);

                break;
        }
        if (texts != "" && texts.length > 0) {
            $imgText.fadeOut(600, function () {
                if (texts.length > n) {
                    $imgText.html(texts[n]);
                } else {
                    $imgText.html("");
                }
                $imgText.fadeIn(600);
            });
        }
    }
    if (s != 0) {
        timers[id] = setTimeout(function () { nextSlideshow(id, imgs, alts, texts, effect, s) }, s);
    }
}
$.plugin($siteLoad, {
    slideShowInit: function () {
        for (var i in slideshowTiles) {

            nextSlideshow(i, slideshowTiles[i][0], slideshowTiles[i][1], slideshowTiles[i][2], slideshowTiles[i][3], slideshowTiles[i][4]);
            for (var j in slideshowTiles[i][0]) {
                var image = $('<img />').attr('src', slideshowTiles[i][0][j]);
            }
        }
        $(".tileSlideshow").on("mouseover", "#sl_arrowLeft, #sl_arrowRight", function () {
            $(this).stop().fadeTo(200, 1);
        }).on("mouseout", "#sl_arrowLeft, #sl_arrowRight", function () {
            $(this).stop().fadeTo(200, 0.4);
        }).on("click", "#sl_arrowLeft", function (event) {
            event.stopPropagation();
            $id = $(this).parent(".tileSlideshow");
            id = $id.attr("id")
            $id.data("n", ($id.data("n") - 1));
            nextSlideshow(id, slideshowTiles[id][0], slideshowTiles[i][1], slideshowTiles[id][2], slideshowTiles[id][3], slideshowTiles[i][4], -1);
            return false;
        }).on("click", "#sl_arrowRight", function (event) {
            event.stopPropagation();
            $id = $(this).parent(".tileSlideshow");
            id = $id.attr("id")
            $id.data("n", ($id.data("n") + 1));
            nextSlideshow(id, slideshowTiles[id][0], slideshowTiles[id][1], slideshowTiles[id][2], slideshowTiles[i][3], slideshowTiles[i][4], 1);
            return false;
        });
    }
});
/* Plugin JS file */

/*
* Get woeid from here:  http://woeid.rosselliot.co.nz/
* Get weather code for use in zipcode variable from http://edg3.co.uk/snippets/weather-location-codes/
*/
function tileWeatherInit(id, zipcode, location, woeid, unit) {
    $.simpleWeather({
        zipcode: zipcode,
        location: location,
        woeid: woeid,
        unit: unit,
        success: function (weather) {
            today = '<div class="weatherwrapper">';
            today += '<div class="img"><img src="' + weather.image + '" style="width:220px;"></div>';
            today += '<div class="weathercontent">';
            today += '<div class="temp">' + weather.temp + '&deg;' + weather.units.temp + '</div>';
            today += '<a class="location" href="' + weather.link + '">' + weather.city + ', ' + weather.region + ' ' + weather.country + '</a>';
            today += '<div class="wind">' + weather.wind.direction + ' ' + weather.wind.speed + ' ' + weather.units.speed + '</div>';
            today += '<div class="humid">' + weather.humidity + '% Humidity</div>';

            today += '</div></div>';
            today += '<div class="forecast">' + weather.forecast + '</div>';
            ///////////-end today html
            tomorrow = '<div style="position: relative;">';
            tomorrow += '<div class="img"><img src="' + weather.tomorrow.image + '" style="width:220px;"></div>';
            tomorrow += '<div style="position: absolute; top: 0; left: 150px;">';
            tomorrow += '<div class="for_title">Tomorrow</div>';
            tomorrow += '<a class="location" href="' + weather.link + '">' + weather.city + ', ' + weather.region + ' ' + weather.country + '</a>';

            tomorrow += '<div class="for_temp">' + weather.tomorrow.high + '&deg; ' + weather.units.temp + ' / ' + weather.tomorrow.low + '&deg; ' + weather.units.temp + '</div>';
            tomorrow += '</div></div>';
            tomorrow += '<div class="forecast">' + weather.tomorrow.forecast + '</div>';
            ///////////-end tomorrow html
            weatherArray = new Array(today, tomorrow);
            $("#tileWeather" + id).children("#weather").html(weatherArray[0])
            setTimeout(function () { weatherUpdater(id, weatherArray, 0) }, 5000); // init this tile
        },
    });
}
function weatherUpdater(id, texts, n) {
    if ($page.current == "home" && !scrolling) {
        var $id = $("#tileWeather" + id).children("#weather")
        $id.stop().animate({ opacity: 0, 'margin-top': '+=15' }, 250, function () {
            $id.css("margin-top", -15).css("opacity", 0)
			.html(texts[n])
			.animate({ opacity: 1, 'margin-top': '+=15' }, 250, function () {
			    $id.css("margin-top", 0).css("opacity", 1);
			})
        });
        n = (n + 2 > texts.length) ? 0 : n + 1;
    }
    n %= 2;
    setTimeout(function () { weatherUpdater(id, texts, n) }, 5000);
}
/* METRO UI TEMPLATE 
/* Copyright 2012 Thomas Verelst, http://metro-webdesign.info*/


/*Functions that will be used everywhere, mainly in main.js */


scrolling = false;
scaleSpacing = scale + spacing;

$page.current = "";
$page.layout = "full";
$page.smallWidth = -1;

$group.count = $group.titles.length;
$group.current = -1;

$arrows.rightArray = [];
mostRight = 0;
mostDown = 0;
tileContainer = "";
zoomScale = 1;

$hashed.parts = [];
$hashed.get = [];
$hashed.doRefresh = true;

submenu = [];

$group.spacing = $group.spacingFull.slice(); // clone arrays

/*Replace spaces by hyphens. ( - )  for TEXT to URL*/
String.prototype.stripSpaces = function () { return this.replace(/\s/g, "-") }
/*Replace hyphens by spaces, for URL to TEXT */
String.prototype.addSpaces = function () { return this.replace(/-/g, " ") }
/*Case insensitive array search and returns the index of that search in the array */
inArrayNCindex = function (val, array) { var i = array.length; val = chars(val.toLowerCase()); while (i--) { if (chars(array[i].toLowerCase()) == val) { return i; } } return -1; }
inArrayNCkey = function (val, array) { val = chars(val.toLowerCase()); for (var key in array) { if (chars(array[key].toLowerCase()) == val) { return key; } } return -1; }
/* Returns the case sensitive index after a case insensitive index search */
strRepeat = function (cnt, char) { var a = [], x = cnt + 1; while (x--) { a[x] = ''; } return a.join(char); }

/*PHP strtr equivalent*/
chars = function (r) {
    r = r.replace(new RegExp("[àáâãäåæąĄ]", 'g'), "a");
    r = r.replace(new RegExp("[çćĆ]", 'g'), "c");
    r = r.replace(new RegExp("[èéêëęĘ]", 'g'), "e");
    r = r.replace(new RegExp("[ìíîï]", 'g'), "i");
    r = r.replace(new RegExp("[ñńŃ]", 'g'), "n");
    r = r.replace(new RegExp("[òóôõöðøóÓ]", 'g'), "o");
    r = r.replace(new RegExp("[œ]", 'g'), "oe");
    r = r.replace(new RegExp("[ùúûü]", 'g'), "u");
    r = r.replace(new RegExp("[ýÿ]", 'g'), "y");
    r = r.replace(new RegExp("[šśŚ]", 'g'), "s");
    r = r.replace(new RegExp("[žżŻźŹ]", 'g'), "z");
    r = r.replace(new RegExp("[Þ]", 'g'), "b");
    r = r.replace(new RegExp("[ß]", 'g'), "ss");
    r = r.replace(new RegExp("[ƒ]", 'g'), "f");
    r = r.replace(new RegExp("[łŁ]", 'g'), "l");
    return r;
};

/* Init the tile-pages move functions */
$.extend($group, {
    goTo: function (n) {
        if ($page.current != "home") {
            window.location.hash = "&" + $group.titles[n].toLowerCase().stripSpaces();
            $show.prepareTiles();
        }
        $tileContainer = $("#tileContainer");
        scrolling = true;
        if (n < 0) { n = 0 };
        $group.current = n;

        $tileContainer.children(".navArrows").hide();
        if ($page.layout == "column" || $group.direction == "vertical") {
            $("html, body").animate({ "scrollTop": $("#groupTitle" + n).offset().top }, scrollSpeed, function () {
                document.title = siteTitle + " | " + $group.titles[$group.current];
                if (history.pushState) {
                    window.history.replaceState("", "", "#&" + chars($group.titles[$group.current].toLowerCase()).stripSpaces());
                }
                setTimeout("scrolling = false", 100);
                $arrows.place(300);
                $events.tileGroupChangeEnd();
            });
        } else {
            $("html, body").animate({ "scrollLeft": getMarginLeft(n) * zoomScale }, scrollSpeed, function () {
                document.title = siteTitle + " | " + $group.titles[$group.current];
                if (history.pushState) {
                    window.history.replaceState("", "", "#&" + chars($group.titles[$group.current].toLowerCase()).stripSpaces());
                }
                setTimeout("scrolling = false", 100);
                $arrows.place(300);
                $events.tileGroupChangeEnd();
            });
        }

        $mainNav.setActive();
        setTileOpacity();

        scrollBg();
        $events.tileGroupChangeBegin();
    },
    goLeft: function () {
        if ($group.current > 0) {
            $group.goTo($group.current - 1);
        } else {
            $group.bounce(-1);
        }
    },
    goRight: function () {
        if ($group.current + 1 < $group.count) {
            $group.goTo($group.current + 1);
        } else {
            $group.bounce(1);
        }
    },
    bounce: function (s) { //gives a bounce effect when there are no pages anymore, s = side: -1 = left, 1 = right
        if (!scrolling) {
            scrolling = true;
            var t;
            if (s > 0) { t = "-=40" } else { t = "+=40"; }
            $('#tileContainer').animate({ 'margin-left': t }, 150).animate({ 'margin-left': 0 }, 150, function () {
                scrolling = false
            });
        }
    }
});

/*Calculates the margin left for tiles/scrolling */
getMarginLeft = function (l) {
    var s = 0;
    for (i = 0; i < l; i++) {
        if ($group.spacing.length > i) { // if in array (to prevent errors);
            s += $group.spacing[i];
        } else {
            s += $group.spacing[$group.spacing.length - 1]; // add last defined groupSpacing
        }
    }
    return s * scaleSpacing;
}

/* Place the arrows on the right place*/
$.extend($arrows, {
    place: function (speed) {
        if ($group.direction == "horizontal") {
            if ($page.layout == "full") {
                $("#tileContainer").children(".navArrows").hide();
                if ($group.current != 0) {
                    $("#arrowLeft").css('margin-left', getMarginLeft($group.current) - 40).fadeTo(speed, 0.5);
                }
                if ($group.current != ($group.count - 1)) {
                    $("#arrowRight").css('margin-left', $arrows.rightArray[$group.current] + 12).fadeTo(speed, 0.5);
                }
            } else if ($page.layout == "small") {
                $("#tileContainer").children(".navArrows").hide();
                if ($group.current != 0) {
                    $("#arrowLeft").css('margin-left', getMarginLeft($group.current) - 40).fadeTo(speed, 0.5);
                }
                if ($group.current != ($group.count - 1)) {
                    $("#arrowRight").css('margin-left', getMarginLeft($group.current) + scaleSpacing * 2 + scale + 12).fadeTo(speed, 0.5);
                }
            } else {
                $("#tileContainer").children(".navArrows").hide();
            }
            $events.arrowsPlaced();
        }
    }
});
/* Hover FX for nav arrows*/
$(document).ready(function () {
    $(".navArrows").bind("mouseover", function () {
        if (!scrolling) {
            $(this).stop(false, true).fadeTo(300, 1);
        }
    }).bind("mouseleave", function () {
        if (!scrolling) {
            $(this).stop(false, true).fadeTo(300, 0.5);
        }
    })
});

/* Scrolls background, if needed */
scrollBg = function () {
    if ($page.layout != "column" && device == "desktop" && $group.direction == "horizontal") {
        if (bgMaxScroll != 0) {
            var t = -$group.current * bgScroll;
            if (t > 0) { t = 0 };
            if ($.browser.name == "msie" && $.browser.version < 10) { // IE9 or lower
                $('#bgImage').stop().animate({ marginLeft: t }, bgScrollSpeed);
            } else { // if IE10 or other browser
                $('#bgImage').css("margin-left", t);
            }
        }
        $events.bgScroll();
    }
}

/* Set width so we can scroll to last tilegroup */
fixScrolling = function () {
    var t;
    if ($page.layout != "column" && $group.direction == "horizontal") {
        if ($("#groupTitle" + ($group.titles.length - 1)).length > 0) {
            t = parseInt(($("#groupTitle" + ($group.titles.length - 1)).css("margin-left")).replace("px", "")) / zoomScale + 25;
            t += $("#headerCenter").width() + ($(window).width() - $("#headerCenter").width()) / 2;
        }
    } else {
        t = scaleSpacing + scale + 10;
    }
    $events.fixScrolling();
    $("#tileContainer").width(t).height(mostDown);
}

recalcScrolling = function () {
    mostDown = 0;
    $("#tileContainer").children(".tile").each(function () {
        var thisRight = parseInt($(this).css("margin-left")) + $(this).width(); // GLOBAL
        if (thisRight > mostRight) {
            mostRight = thisRight;
        }
        var thisDown = parseInt($(this).css("margin-top")) + $(this).height();
        if (thisDown > mostDown) {
            mostDown = thisDown;
        }
    })
    $events.recalcScrolling();
}

/* To create subnav */
$subNav = {
    make: function () {/* Generates the subnav- menu, makes sub-Navigation items */
        $("#subNavWrapper").children("#subNav").remove();
        $("#subNavTemp").children().prependTo("#subNavWrapper");
        $("#subNavTemp").remove();
        $("#subNav").children("a").each(function () {
            $(this).attr("href", $(this).attr("href").replace("?p=", "#!/"));
        });
        $subNav.setActive();
        $events.subNavMake();
    },
    /* highlights current sub-navigation-item */
    setActive: function () {
        var $nav = $("#subNav");
        $nav.children("a").removeClass("subNavItemActive");
        $nav.children('[href$="' + $hashed.parts[0] + '"]').addClass("subNavItemActive");
        $events.subNavActive();
    }
}

/* Makes main (top) nav */
$mainNav = {
    init: function () {
        $("nav").on("click", "a", function () {
            if (typeof $(this).attr("rel") !== "undefined") {
                $group.goTo(parseInt($(this).attr("rel").replace("group", "")));
            }
            if (typeof $(this).attr("id") !== "undefined") {
                $group.goTo(parseInt($(this).attr("id").replace("group", "")));
            }
        });
        $events.mainNavInit();
    },
    setActive: function () {
        var $nav = $("nav")
        $nav.children("a").removeClass("navActive");
        $nav.children("[rel='group" + $group.current + "']").addClass("navActive");
        $nav.children("#group" + $group.current).addClass("navActive");
        $events.mainNavActive();
    },
    set: function (w) {/* Used to manually select the highlighted menu */
        var $nav = $("nav")
        w = $.trim(w.toLowerCase());
        $nav.children("a").removeClass("navActive");
        $nav.children("a").each(function () {
            if ($.trim($(this).text().toLowerCase()) == w.toLowerCase()) {
                $(this).addClass("navActive");
            }
        });
        $events.mainNavSet();
    }
}

/*For smaller column mainnav */
$(document).on("click", "#navTitle", function () {
    if ($("nav>a").css("display") == "none") {
        $("nav>a").css("display", "block");
    } else {
        $("nav>a").css("display", "none");
    }
});

/* Creates a nice link according to the required page */
makeLink = function (lp) {/* To make valid links */
    if (lp.substr(0, 9) == 'external:' || lp.substr(0, 9) == 'gotolink:') {
        return lp.substr(9);
    }
    if (lp == "") {
        return '';
    }
    if (lp.substr(0, 7) == "http://" ||
	   lp.substr(0, 8) == "https://" ||
	   lp.substr(0, 1) == "/" ||
	   lp.substr(0, 1) == "#" ||
	   lp[lp.length - 1] == "/") {
        return lp;
    }
    $events.makeLink();
    if (typeof pageTitles[lp] == "undefined") {
        return "#!/url=" + chars(lp.toLowerCase().stripSpaces());
    } else {
        return "#!/" + chars(pageTitles[lp].toLowerCase().stripSpaces());
    }
}

/* For menu / tile links, generates the link + href + target attribute if needed */
makeLinkHref = function (lp) {/* To make valid links */
    var t = '';
    if (lp.substr(0, 9) == 'external:') {
        t = " target='_blank' ";
        lp = lp.substr(9);
    }
    $events.makeLinkHref();
    if (lp == "") {
        return "";
    }
    return t + " href='" + makeLink(lp) + "' ";
}

/* Will be called on page load to transform urls to nice urls */
transformLinks = function () {
    $("a[rel=metro-link]").each(function () {
        $(this).attr("href", $(this).attr("href").replace("?p=", "#!/"));
    });
    $events.transformLinks();
}

/*Fired when clicked on any link*/
$(document).on("click", "a", function () {
    if (this.href == window.location.href) { // if we're already on the page the user wants to go
        $(window).hashchange(); // just refresh page
    };
});
/* METRO UI TEMPLATE
/* Copyright 2013 Thomas Verelst, http://metro-webdesign.info*/

/*This file does the basic things for the template like loading pages and uses functinos of functions.js*/
$show = {
    prepareTiles: function () { /* Prepare for showing the tilepage */
        $events.onTilesPrepare();
        $("#subNav").fadeOut(hideSpeed);
        $("#centerWrapper").fadeOut(hideSpeed, function () {
            $show.tiles();
        });
    },
    tiles: function () { /* Show homepage */
        $("#adminEditButton").attr("href", "admin/code-editor.php?p=../config/tiles.php" + $hashed.parts[0]); // for admin editor things
        $tileContainer = $("#tileContainer")
        $allTiles = $tileContainer.children(".tile");
        $tileContainer.show().children().hide();
        $("#contentWrapper, #subNavWrapper").hide();
        $("#centerWrapper").show();

        document.title = siteTitle + " | " + siteTitleHome;
        if ($hashed.parts.length == 1 || ($group.current = inArrayNCindex($hashed.parts[1].addSpaces(), $group.titles)) == -1) { $group.current = 0; }
        $("html, body").animate({ "scrollLeft": getMarginLeft($group.current) }, 1);
        $page.current = "home";

        $tileContainer.addClass("loading")
        $events.beforeTilesShow();

        if ($group.inactive.opacity == 1) { /* Code for effects */
            if ($group.showEffect == 0) {
                $allTiles.each(function (index) {
                    var $this = $(this)
                    if ($this.hasClass("group0")) {
                        $this.delay(50 * index).show(300);
                    } else {
                        $this.delay(50 * index).fadeIn(300);
                    }
                });
            } else if ($group.showEffect == 1) {
                $allTiles.fadeIn(700);
            } else if ($group.showEffect == 2) {
                $allTiles.show(700);
            }
            $tileContainer.children(".groupTitle").fadeIn(700);
        } else {
            $allTiles.not(".group" + $group.current).fadeTo(700, $group.inactive.opacity);
            $tileContainer.children(".group" + $group.current).removeClass("inactiveTile").fadeTo(700, 1);
            $tileContainer.children(".groupTitle").fadeTo(500, $group.inactive.opacity);
            $("#groupTitle" + $group.current).fadeTo(500, 1);
            if (!$group.inactive.clickable) {
                $tileContainer.unbind("click.inactiveTile");
                $tileContainer.on("click.inactiveTile", ".tile", function () {
                    var $this = $(this)
                    if (!$this.hasClass("group" + $group.current)) {
                        var thisClass = $this.attr("class")
                        $group.goTo(parseInt(thisClass.substr((thisClass.indexOf("group") + 5), 3)));
                        return false;
                    }
                });
                $allTiles.not(".group" + $group.current).addClass("inactiveTile");
            }
        }

        setTimeout(function () {
            $tileContainer.removeClass("loading")
            $arrows.place(400); // must ALWAYS happen after ALL tiles are showed! (in this case, tiles after 700ms, arrows after 350+800 ms
            $(window).resize(); // check the scrollbars now, same as ^
            $events.afterTilesShow();
        }, 701);

        $mainNav.setActive();

        $(window).resize();
    },
    page: function () { /* show a page with content */
        $("#adminEditButton").attr("href", "admin/page-editor.php?p=" + $hashed.parts[0]);
        $content = $("#content")
        $("#tileContainer").hide();
        $("#centerWrapper").show();
        if ($("#contentWrapper").css("display") == "none") {
            $("#contentWrapper, #subNavWrapper").fadeIn(500);
        }
        $content.html("<img src='themes/" + theme + "/img/primary/loader.gif' height='24' width='24'/>");
        $group.current = -1;
        $page.current = "loading";

        var title;
        if ($hashed.parts[0].substr(0, 4) == "url=") { // if the template already noticed the link was not in pageTitles array when generating the url
            title = $hashed.parts[0].substr(4).split(".")[0].addSpaces();
            url = $hashed.parts[0].substr(4);
        } else { // url is OK
            var hashReq = $hashed.parts[0].addSpaces();
            var i = inArrayNCkey(hashReq, pageURL); // find the corresponding array entry with title
            if (i != -1) { // found!
                title = pageTitles[i];
                url = i;
            } else { // not found! let's do a wild guess of the url!
                title = hashReq.split(".")[0];
                url = hashReq + ".php";
            }
        }
        $.ajax("pages/" + url + (typeof $hashed.get[1] != "undefined" ? "?" + $hashed.get[1] : "")).success(function (newContent, textStatus) {
            $content.css("margin-left", 0).fadeOut(50, function () {
                $content.html(newContent);
                $page.current = url;
                $subNav.make();
                transformLinks();
                $events.beforeSubPageShow();
                $content.show(250, function () {
                    $events.afterSubPageShow();
                    $(window).resize();
                });
                if (typeof _gaq !== "undefined" && _gaq !== null) { _gaq.push(['_trackPageview', "/#!/" + $hashed.parts[0]]); }
            });
        }).error(function () {
            title = l_pageNotFound;
            $content.html(l_pageNotFoundDesc).show(400);
            $subNav.setActive();
            document.title = title + " | " + siteTitle;
        })

        document.title = title + " | " + siteTitle;
        $(window).resize();
    }
}

$(window).hashchange(function () {
    $hashed.get = chars(decodeURI(window.location.hash).replace("#!/", "").replace("!/", "").replace("#!", "").replace("#", "")).split("?");
    $hashed.parts = $hashed.get[0].split("&");
    $events.hashChangeBegin();
    if ($hashed.doRefresh) {
        if ($hashed.parts[0] == "") { // homepage with tiles
            if ($group.current == -1) { // no tiles shown
                if ($page.current == "") {
                    $show.tiles();
                } else {
                    $show.prepareTiles();
                }
            } else { // it must have been a tilegroup switch
                if ($hashed.parts.length > 1) {
                } else if ($group.current == 0) {//we refresh the page
                    $show.prepareTiles();
                } else {
                    $group.goTo(0);
                }
            }
        } else { // page with content
            if ($page.current == "home") { // homepage with tiles
                $("#centerWrapper").fadeOut(hideSpeed, function () {
                    $show.page();
                });
            } else if ($page.current != "") { // other content page
                $("#content").fadeOut(hideSpeed, function () {
                    $show.page();
                });
            } else { // nothing loaded yet
                $show.page();
            }
        }
    }

    $events.hashChangeEnd();
});


$(window).resize(function () {
    $events.windowResizeBegin();

    $tileContainer = $("#tileContainer")

    if (device != "desktop") {/*Fix scrolling issues on mobile devices*/
        $('<style></style>').appendTo($(document.body)).remove();
    }

    /*Responsive tile layout */
    var windowWidth = $(window).width() / scaleSpacing
    if (windowWidth < 3.2) {
        if (!$("body").hasClass("column")) {
            $("body").removeClass("full").removeClass("small").addClass("column");
            $page.layout = "column";
            $("nav").prepend("<div id='navTitle'>" + l_menu + "</div>").appendTo("body").children("a").css("display", "none")
            if (autoRearrangeTiles) {
                var t = 0;
                for (i = 0; i < $group.count; i++) {
                    var spaceUsed = [];
                    $tileContainer.children("#groupTitle" + i).css("margin-left", 0).css("margin-top", t);
                    $tileContainer.children(".group" + i).each(function () {
                        var j = spaceUsed.length
                        if ($(this).width() > (scale)) { // tile with width 2 or wider
                            if (autoResizeTiles && $(this).width() > scaleSpacing + scale) {
                                $(this).width(scaleSpacing + scale)
                            }
                            $(this).css("margin-left", 0).css("margin-top", (45 + j * scaleSpacing + t));
                            for (l = 0; l <= ($(this).height() - scale) / scaleSpacing; l++) {
                                spaceUsed[j + l] = "11";
                            }
                        } else { // tile with width 1
                            var f = true;
                            for (var k in spaceUsed) {
                                k = parseInt(k);
                                var pos = spaceUsed[k].indexOf("0")
                                if (pos > -1) {

                                    var e = true;
                                    for (l = 0; l <= ($(this).height() - scale) / scaleSpacing; l++) {
                                        if (typeof spaceUsed[k + l] !== "undefined" && spaceUsed[k + l].charAt(pos) != "0") {
                                            e = false;
                                            break;
                                        }
                                    }

                                    if (e) {// the tile will fit!
                                        $(this).css("margin-left", pos * scaleSpacing).css("margin-top", (45 + k * scaleSpacing + t));
                                        for (l = 0; l <= ($(this).height() - scale) / scaleSpacing; l++) {
                                            if (typeof spaceUsed[parseInt(k) + l] === "undefined") {
                                                var c = "00";
                                            } else {
                                                var c = spaceUsed[k + l];
                                            }
                                            spaceUsed[k + l] = c.substr(0, pos) + "1" + c.substr(pos + 1);

                                        }
                                        f = false;
                                        break;
                                    }
                                }
                            }
                            if (f) { // the tile doesn't fit anywhere, let's create a new row
                                $(this).css("margin-left", 0).css("margin-top", (45 + j * scaleSpacing + t));
                                for (l = 0; l <= ($(this).height() - scale) / scaleSpacing; l++) {
                                    spaceUsed[j + l] = "10";
                                    //j++;
                                }
                            }
                        }
                    });
                    t += (spaceUsed.length + 0.5) * scaleSpacing
                }
            }
            setTimeout(function () {
                recalcScrolling();
                fixScrolling();
            }, 500);
            $arrows.place(400);
            $events.toColumn();
        }
        if ($page.current == "home") {
            $tileContainer.show();
        }
        setTileOpacity();
    } else if (autoRearrangeTiles && windowWidth < rearrangeTreshhold + 1.2) {
        if (!$("body").hasClass("small") || ($("body").hasClass("small") && Math.ceil(windowWidth) != $page.smallWidth)) {
            $("body").removeClass("column").removeClass("full").addClass("small");
            $page.layout = "small";
            $page.smallWidth = (Math.ceil(windowWidth) > rearrangeTreshhold ? rearrangeTreshhold + 1 : Math.ceil(windowWidth));
            $("nav").appendTo("#headerCenter").children("a").css("display", "inline-block")
            $("#navTitle").remove()
            var w = $page.smallWidth - 1;
            if ($group.direction == "horizontal") {
                for (var i in $group.spacing) {
                    $group.spacing[i] = w + 1;
                }
                for (i = 0; i < $group.count; i++) {
                    $("#groupTitle" + i).css("margin-left", i * scaleSpacing * (w + 1)).css("margin-top", 0);
                    var spaceUsed = []
                    var j = 0; // the row we'll be working on
                    var t = getMarginLeft(i);
                    $tileContainer.children(".group" + i).each(function () {
                        $(this).css("width", parseInt($(this).data("pos").split("-")[2]));

                        var j = spaceUsed.length;
                        var thisw = Math.round(($(this).width() - scale) / scaleSpacing + 1); //tile width in tiles
                        if (thisw > w) { // if tile is as width as the max width or wider	
                            if (autoResizeTiles) {
                                $(this).width(scaleSpacing * (w - 1) + scale);
                            }
                            $(this).css("margin-left", t).css("margin-top", 45 + j * scaleSpacing);
                            var s = strRepeat(w, "1")
                            for (l = 0; l <= ($(this).height() - scale) / scaleSpacing; l++) {
                                spaceUsed[j + l] = s;
                            }
                        } else { // fit it somewhere!
                            var f = true;
                            for (var k in spaceUsed) {
                                k = parseInt(k);
                                var s = strRepeat(thisw, "0");
                                var pos = spaceUsed[k].indexOf(s);
                                if (pos > -1) {
                                    var e = true
                                    for (l = 0; l <= ($(this).height() - scale) / scaleSpacing; l++) {
                                        if (typeof spaceUsed[k + l] !== "undefined" && spaceUsed[k + l].substr(pos, thisw) != s) {
                                            e = false;
                                            break;
                                        }
                                    }
                                    if (e) { // yeps, tile will fit!
                                        $(this).css("margin-left", t + pos * scaleSpacing).css("margin-top", 45 + k * scaleSpacing);
                                        var s = strRepeat(thisw, "1");
                                        for (l = 0; l <= ($(this).height() - scale) / scaleSpacing; l++) {
                                            if (typeof spaceUsed[k + l] === "undefined") {
                                                var c = strRepeat(w, "0");
                                            } else {
                                                var c = spaceUsed[k + l];
                                            }
                                            spaceUsed[k + l] = c.substr(0, pos) + s + c.substr(pos + thisw);
                                        }
                                        f = false;
                                        break;
                                    }
                                }
                            }
                            if (f) {
                                $(this).css("margin-left", t).css("margin-top", (45 + j * scaleSpacing));
                                var s = strRepeat(thisw, "1") + strRepeat(w - thisw, "0");
                                for (l = 0; l <= ($(this).height() - scale) / scaleSpacing; l++) {
                                    spaceUsed[j + l] = s;
                                }
                            }
                        }
                    });
                }
            } else if ($group.direction == "vertical") {
                var j = 0; // the max row we've worked on
                for (i = 0; i < $group.count; i++) {
                    var spaceUsed = []
                    $("#groupTitle" + i).css("margin-left", 0).css("margin-top", j * scaleSpacing);

                    $tileContainer.children(".group" + i).each(function () {
                        var thisw = Math.round(($(this).width() - scale) / scaleSpacing + 1); //tile width in tiles
                        $(this).css("width", parseInt($(this).data("pos").split("-")[2]));
                        if (thisw > w) { // if tile is as width as the max width or wider	
                            if (autoResizeTiles) {
                                $(this).width(scaleSpacing * (w - 1) + scale);
                            }
                            $(this).css("margin-left", 0).css("margin-top", 45 + (spaceUsed.lenght + j) * scaleSpacing);
                            var s = strRepeat(w, "1")
                            for (l = 0; l <= ($(this).height() - scale) / scaleSpacing; l++) {
                                spaceUsed[spaceUsed.lenght] = s;
                            }
                        } else { // fit it somewhere!
                            var f = true;
                            for (var k in spaceUsed) {
                                k = parseInt(k);
                                var s = strRepeat(thisw, "0");
                                var pos = spaceUsed[k].indexOf(s);
                                if (pos > -1) {
                                    var e = true
                                    for (l = 0; l <= ($(this).height() - scale) / scaleSpacing; l++) {
                                        if (typeof spaceUsed[k + l] !== "undefined" && spaceUsed[k + l].substr(pos, thisw) != s) {
                                            e = false;
                                            break;
                                        }
                                    }
                                    if (e) { // yeps, tile will fit!
                                        $(this).css("margin-left", pos * scaleSpacing).css("margin-top", 45 + (j + k) * scaleSpacing);
                                        var s = strRepeat(thisw, "1");
                                        for (l = 0; l <= ($(this).height() - scale) / scaleSpacing; l++) {
                                            if (typeof spaceUsed[k + l] === "undefined") {
                                                var c = strRepeat(w, "0");
                                            } else {
                                                var c = spaceUsed[k + l];
                                            }
                                            spaceUsed[k + l] = c.substr(0, pos) + s + c.substr(pos + thisw);
                                        }
                                        f = false;
                                        break;
                                    }
                                }
                            }
                            if (f) {
                                $(this).css("margin-left", 0).css("margin-top", (45 + (spaceUsed.length + j) * scaleSpacing));
                                var s = strRepeat(thisw, "1") + strRepeat(w - thisw, "0");
                                for (l = 0; l <= ($(this).height() - scale) / scaleSpacing; l++) {
                                    spaceUsed[spaceUsed.length + l] = s;
                                }
                            }
                        }
                    });
                    j += spaceUsed.length + 0.5;
                }
            }
            setTimeout(function () {
                recalcScrolling();
                fixScrolling();
            }, 500);
            setTileOpacity();
            $arrows.place(400);
            $events.toSmall();
        }
    } else {
        if (!$("body").hasClass("full")) {
            $("body").removeClass("column").removeClass("small").addClass("full");
            $page.layout = "full";
            $("nav").appendTo("#headerCenter").children("a").css("display", "inline-block")
            $("#navTitle").remove()
            $group.spacing = $group.spacingFull.slice();
            if ($page.current == "home") {
                $("#tileContainer").children(".tile").each(function () {
                    var pos = $(this).data("pos").split("-");
                    $(this).css("margin-top", parseInt(pos[0])).css("margin-left", parseInt(pos[1])).css("width", parseInt(pos[2]));
                });
                if ($group.direction == "horizontal") {
                    for (i = 0; i < $group.count; i++) {
                        $("#groupTitle" + i).css("margin-left", getMarginLeft(i)).css("margin-top", 0);
                    }
                } else {
                    for (i = 0; i < $group.count; i++) {
                        $("#groupTitle" + i).css("margin-left", 0).css("margin-top", getMarginLeft(i));
                    }
                }
            } else {
                $tileContainer.html(tileContainer);
            }
            setTimeout(function () {
                recalcScrolling();
                fixScrolling();
            }, 500);
            setTileOpacity();
            $arrows.place(400);
            $events.toFull();
        }
        if ($page.current == "home") {
            $tileContainer.show();
        }
    }

    /*Check mousewheel */
    if (!mouseScroll || mouseScroll == "vertical" || $group.direction == "vertical" || $page.current != 'home' || $page.layout == "column" || (disableGroupScrollingWhenVerticalScroll && $(document).height() > $(window).height())) {	/*Scrolling on pages and home */
        $(document).unbind("mousewheel.scrollGroups");
    } else {
        $(document).bind("mousewheel.scrollGroups", function (event, delta) { /* Mouse scroll to move tilepages */
            if (mouseScroll == true || mouseScroll == "groups") {
                if (scrolling && $("#panel").css("display") != "none" && typeof panelGroupScrolling != "undefined" && !panelGroupScrolling) {
                    if (delta > 0) {
                        $("#panel").scrollTop($("#panel").scrollTop() - 20);
                    } else {
                        $("#panel").scrollTop($("#panel").scrollTop() + 20);
                    }
                } else if (!scrolling) {
                    if (delta > 0) {
                        $group.goLeft();
                    } else {
                        $group.goRight();
                    }
                }
            } else if (mouseScroll == "horizontal") {
                $(window).scrollLeft($(window).scrollLeft() - (delta * 30));
            }

            event.preventDefault();
        });
    }

    /* Change menu if page is too small */
    if ($("#headerWrapper").height() > $("#headerTitles").height() * 1.3) {
        $("nav").find("img").hide();
    } else {
        $("nav").find("img").show();
    }

    /* Adapt wrapper to header height */
    $("#wrapper").css("padding-top", $("#headerWrapper").height())

    /* BG SCROLLING */
    rightSpace = $("#bgImage").width() - $(window).width();
    bgScroll = rightSpace / $group.count;
    if (bgScroll > bgMaxScroll) { bgScroll = bgMaxScroll; };
    scrollBg();

    /*Fix scrolling */
    $events.windowResizeEnd();
});

/* To prevent scroll bugs */
$(window).scroll(function () {
    if (scrollHeader && $group.direction == "horizontal") {
        $("header").css("top", -$(document).scrollTop());
    }
    if (!scrolling && $page.current == "home") {
        var scrollLeft = $(window).scrollLeft() / (scaleSpacing * zoomScale);

        var diffSpacing = [];
        var t = 0; // temp var 
        diffSpacing[0] = scrollLeft;
        for (i = 1; i < $group.spacing.length; i++) {
            t += $group.spacing[i - 1];
            diffSpacing[i] = Math.abs(t - scrollLeft);
        }
        var t = 999;
        var n = 0;
        for (var i in diffSpacing) {
            if (diffSpacing[i] < t) {
                t = diffSpacing[i];
                n = i;
            }
        }
        if ($group.current != n) {
            $group.current = parseInt(n);
            if (typeof setHash != "undefined") {
                clearTimeout(setHash);
            }
            setHash = setTimeout(function () {
                window.location.hash = "&" + $group.titles[parseInt($group.current)].toLowerCase().stripSpaces();
                $arrows.place(400);
            }, 300);

            scrollBg();
            $mainNav.setActive();
            setTileOpacity();
        }
        $events.onScroll();
    }
});

setTileOpacity = function () {
    if ($group.inactive.opacity == 1 || $page.layout == "column") { // makes the inactive tilegroups transparent
        $tileContainer.children().not(".navArrows").fadeTo(0, 1);
    } else {
        $tileContainer.children(".tile,.groupTitle").not(".group" + $group.current).stop().fadeTo(500, $group.inactive.opacity);
        $tileContainer.children(".group" + $group.current + ", #groupTitle" + $group.current).removeClass("inactiveTile").stop().fadeTo(500, 1);
        if (!$group.inactive.clickable) { // if this function is activatd, clicking on an inactive tilegroup will go to that tilegroup
            $tileContainer.unbind("click.inactiveTile");
            $tileContainer.on("click.inactiveTile", ".tile", function () {
                var $this = $(this)
                if (!$this.hasClass("group" + $group.current)) {
                    var thisClass = $this.attr("class")
                    $group.goTo(parseInt(thisClass.substr((thisClass.indexOf("group") + 5), 3)));
                    return false;
                }
            });
            $tileContainer.children(".tile").not(".group" + $group.current).addClass("inactiveTile");
        }
    }
}

window.onload = function () {
    $tileContainer = $("#tileContainer");

    $events.siteLoad();

    /* for fixing dimension issues */
    for (i = 0; i < $group.count; i++) {
        var mostRightGr = -999;
        $tileContainer.children(".group" + i).each(function () {

            /*For good scrolling */
            var thisRight = parseInt($(this).css("margin-left")) + $(this).width(); // GLOBAL
            if (thisRight > mostRight) {
                mostRight = thisRight;
            }
            var thisDown = parseInt($(this).css("margin-top")) + $(this).height();
            if (thisDown > mostDown) {
                mostDown = thisDown;
            }
            thisRightGr = parseInt($(this).css('margin-left')) + $(this).width()  // FOR THIS GROUP 
            if (thisRightGr > mostRightGr) {
                mostRightGr = thisRightGr
            }
            $arrows.rightArray[i] = mostRightGr;

            /* For nice urls with nice transitions */
            if (typeof $(this).attr("href") != "undefined") {
                $(this).attr("href", $(this).attr("href").replace("?p=", "#!/"));
            }
        })
    }
    tileContainer = $("#tileContainer").html();

    /*For good scrolling */
    fixScrolling();

    /* make links for mainnav for navigation */
    $mainNav.init();

    /*Start page rendering */
    setTimeout(function () {
        $(window).hashchange();
    }, 20);
    $(window).resize();
};
/*
 * jQuery Media Plugin for converting elements into rich media content.
 *
 * Examples and documentation at: http://malsup.com/jquery/media/
 * Copyright (c) 2007-2010 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * @author: M. Alsup
 * @version: 0.97 (20-MAY-2011)
 * @requires jQuery v1.1.2 or later
 * $Id: jquery.media.js 2460 2007-07-23 02:53:15Z malsup $
 *
 * Supported Media Players:
 *	- Flash
 *	- Quicktime
 *	- Real Player
 *	- Silverlight
 *	- Windows Media Player
 *	- iframe
 *
 * Supported Media Formats:
 *	 Any types supported by the above players, such as:
 *	 Video: asf, avi, flv, mov, mpg, mpeg, mp4, qt, smil, swf, wmv, 3g2, 3gp
 *	 Audio: aif, aac, au, gsm, mid, midi, mov, mp3, m4a, snd, rm, wav, wma
 *	 Other: bmp, html, pdf, psd, qif, qtif, qti, tif, tiff, xaml
 *
 * Thanks to Mark Hicken and Brent Pedersen for helping me debug this on the Mac!
 * Thanks to Dan Rossi for numerous bug reports and code bits!
 * Thanks to Skye Giordano for several great suggestions!
 * Thanks to Richard Connamacher for excellent improvements to the non-IE behavior!
 */
; (function ($) {

    var lameIE = $.browser.msie && $.browser.version < 9;

    /**
     * Chainable method for converting elements into rich media.
     *
     * @param options
     * @param callback fn invoked for each matched element before conversion
     * @param callback fn invoked for each matched element after conversion
     */
    $.fn.media = function (options, f1, f2) {
        if (options == 'undo') {
            return this.each(function () {
                var $this = $(this);
                var html = $this.data('media.origHTML');
                if (html)
                    $this.replaceWith(html);
            });
        }

        return this.each(function () {
            if (typeof options == 'function') {
                f2 = f1;
                f1 = options;
                options = {};
            }
            var o = getSettings(this, options);
            // pre-conversion callback, passes original element and fully populated options
            if (typeof f1 == 'function') f1(this, o);

            var r = getTypesRegExp();
            var m = r.exec(o.src.toLowerCase()) || [''];

            o.type ? m[0] = o.type : m.shift();
            for (var i = 0; i < m.length; i++) {
                fn = m[i].toLowerCase();
                if (isDigit(fn[0])) fn = 'fn' + fn; // fns can't begin with numbers
                if (!$.fn.media[fn])
                    continue;  // unrecognized media type
                // normalize autoplay settings
                var player = $.fn.media[fn + '_player'];
                if (!o.params) o.params = {};
                if (player) {
                    var num = player.autoplayAttr == 'autostart';
                    o.params[player.autoplayAttr || 'autoplay'] = num ? (o.autoplay ? 1 : 0) : o.autoplay ? true : false;
                }
                var $div = $.fn.media[fn](this, o);

                $div.css('backgroundColor', o.bgColor).width(o.width);

                if (o.canUndo) {
                    var $temp = $('<div></div>').append(this);
                    $div.data('media.origHTML', $temp.html()); // store original markup
                }

                // post-conversion callback, passes original element, new div element and fully populated options
                if (typeof f2 == 'function') f2(this, $div[0], o, player.name);
                break;
            }
        });
    };

    /**
     * Non-chainable method for adding or changing file format / player mapping
     * @name mapFormat
     * @param String format File format extension (ie: mov, wav, mp3)
     * @param String player Player name to use for the format (one of: flash, quicktime, realplayer, winmedia, silverlight or iframe
     */
    $.fn.media.mapFormat = function (format, player) {
        if (!format || !player || !$.fn.media.defaults.players[player]) return; // invalid
        format = format.toLowerCase();
        if (isDigit(format[0])) format = 'fn' + format;
        $.fn.media[format] = $.fn.media[player];
        $.fn.media[format + '_player'] = $.fn.media.defaults.players[player];
    };

    // global defautls; override as needed
    $.fn.media.defaults = {
        standards: true,       // use object tags only (no embeds for non-IE browsers)
        canUndo: true,       // tells plugin to store the original markup so it can be reverted via: $(sel).mediaUndo()
        width: 400,
        height: 400,
        autoplay: 0,		   	// normalized cross-player setting
        bgColor: '#ffffff', 	// background color
        params: { wmode: 'transparent' },	// added to object element as param elements; added to embed element as attrs
        attrs: {},			// added to object and embed elements as attrs
        flvKeyName: 'file', 	// key used for object src param (thanks to Andrea Ercolino)
        flashvars: {},			// added to flash content as flashvars param/attr
        flashVersion: '7',	// required flash version
        expressInstaller: null,	// src for express installer

        // default flash video and mp3 player (@see: http://jeroenwijering.com/?item=Flash_Media_Player)
        flvPlayer: 'mediaplayer.swf',
        mp3Player: 'mediaplayer.swf',

        // @see http://msdn2.microsoft.com/en-us/library/bb412401.aspx
        silverlight: {
            inplaceInstallPrompt: 'true', // display in-place install prompt?
            isWindowless: 'true', // windowless mode (false for wrapping markup)
            framerate: '24',	  // maximum framerate
            version: '0.9',  // Silverlight version
            onError: null,	  // onError callback
            onLoad: null,   // onLoad callback
            initParams: null,	  // object init params
            userContext: null	  // callback arg passed to the load callback
        }
    };

    // Media Players; think twice before overriding
    $.fn.media.defaults.players = {
        flash: {
            name: 'flash',
            title: 'Flash',
            types: 'flv,mp3,swf',
            mimetype: 'application/x-shockwave-flash',
            pluginspage: 'http://www.adobe.com/go/getflashplayer',
            ieAttrs: {
                classid: 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000',
                type: 'application/x-oleobject',
                codebase: 'http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' + $.fn.media.defaults.flashVersion
            }
        },
        quicktime: {
            name: 'quicktime',
            title: 'QuickTime',
            mimetype: 'video/quicktime',
            pluginspage: 'http://www.apple.com/quicktime/download/',
            types: 'aif,aiff,aac,au,bmp,gsm,mov,mid,midi,mpg,mpeg,mp4,m4a,psd,qt,qtif,qif,qti,snd,tif,tiff,wav,3g2,3gp',
            ieAttrs: {
                classid: 'clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B',
                codebase: 'http://www.apple.com/qtactivex/qtplugin.cab'
            }
        },
        realplayer: {
            name: 'real',
            title: 'RealPlayer',
            types: 'ra,ram,rm,rpm,rv,smi,smil',
            mimetype: 'audio/x-pn-realaudio-plugin',
            pluginspage: 'http://www.real.com/player/',
            autoplayAttr: 'autostart',
            ieAttrs: {
                classid: 'clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA'
            }
        },
        winmedia: {
            name: 'winmedia',
            title: 'Windows Media',
            types: 'asx,asf,avi,wma,wmv',
            mimetype: $.browser.mozilla && isFirefoxWMPPluginInstalled() ? 'application/x-ms-wmp' : 'application/x-mplayer2',
            pluginspage: 'http://www.microsoft.com/Windows/MediaPlayer/',
            autoplayAttr: 'autostart',
            oUrl: 'url',
            ieAttrs: {
                classid: 'clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6',
                type: 'application/x-oleobject'
            }
        },
        // special cases
        img: {
            name: 'img',
            title: 'Image',
            types: 'gif,png,jpg'
        },
        iframe: {
            name: 'iframe',
            types: 'html,pdf'
        },
        silverlight: {
            name: 'silverlight',
            types: 'xaml'
        }
    };

    //
    //	everything below here is private
    //


    // detection script for FF WMP plugin (http://www.therossman.org/experiments/wmp_play.html)
    // (hat tip to Mark Ross for this script)
    function isFirefoxWMPPluginInstalled() {
        var plugs = navigator.plugins;
        for (var i = 0; i < plugs.length; i++) {
            var plugin = plugs[i];
            if (plugin['filename'] == 'np-mswmp.dll')
                return true;
        }
        return false;
    }

    var counter = 1;

    for (var player in $.fn.media.defaults.players) {
        var types = $.fn.media.defaults.players[player].types;
        $.each(types.split(','), function (i, o) {
            if (isDigit(o[0])) o = 'fn' + o;
            $.fn.media[o] = $.fn.media[player] = getGenerator(player);
            $.fn.media[o + '_player'] = $.fn.media.defaults.players[player];
        });
    };

    function getTypesRegExp() {
        var types = '';
        for (var player in $.fn.media.defaults.players) {
            if (types.length) types += ',';
            types += $.fn.media.defaults.players[player].types;
        };
        return new RegExp('\\.(' + types.replace(/,/ig, '|') + ')\\b');
    };

    function getGenerator(player) {
        return function (el, options) {
            return generate(el, options, player);
        };
    };

    function isDigit(c) {
        return '0123456789'.indexOf(c) > -1;
    };

    // flatten all possible options: global defaults, meta, option obj
    function getSettings(el, options) {
        options = options || {};
        var $el = $(el);
        var cls = el.className || '';
        // support metadata plugin (v1.0 and v2.0)
        var meta = $.metadata ? $el.metadata() : $.meta ? $el.data() : {};
        meta = meta || {};
        var w = meta.width || parseInt(((cls.match(/\bw:(\d+)/) || [])[1] || 0)) || parseInt(((cls.match(/\bwidth:(\d+)/) || [])[1] || 0));
        var h = meta.height || parseInt(((cls.match(/\bh:(\d+)/) || [])[1] || 0)) || parseInt(((cls.match(/\bheight:(\d+)/) || [])[1] || 0))

        if (w) meta.width = w;
        if (h) meta.height = h;
        if (cls) meta.cls = cls;

        // crank html5 style data attributes
        var dataName = 'data-';
        for (var i = 0; i < el.attributes.length; i++) {
            var a = el.attributes[i], n = $.trim(a.name);
            var index = n.indexOf(dataName);
            if (index === 0) {
                n = n.substring(dataName.length);
                meta[n] = a.value;
            }
        }

        var a = $.fn.media.defaults;
        var b = options;
        var c = meta;

        var p = { params: { bgColor: options.bgColor || $.fn.media.defaults.bgColor } };
        var opts = $.extend({}, a, b, c);
        $.each(['attrs', 'params', 'flashvars', 'silverlight'], function (i, o) {
            opts[o] = $.extend({}, p[o] || {}, a[o] || {}, b[o] || {}, c[o] || {});
        });

        if (typeof opts.caption == 'undefined') opts.caption = $el.text();

        // make sure we have a source!
        opts.src = opts.src || $el.attr('href') || $el.attr('src') || 'unknown';
        return opts;
    };

    //
    //	Flash Player
    //

    // generate flash using SWFObject library if possible
    $.fn.media.swf = function (el, opts) {
        if (!window.SWFObject && !window.swfobject) {
            // roll our own
            if (opts.flashvars) {
                var a = [];
                for (var f in opts.flashvars)
                    a.push(f + '=' + opts.flashvars[f]);
                if (!opts.params) opts.params = {};
                opts.params.flashvars = a.join('&');
            }
            return generate(el, opts, 'flash');
        }

        var id = el.id ? (' id="' + el.id + '"') : '';
        var cls = opts.cls ? (' class="' + opts.cls + '"') : '';
        var $div = $('<div' + id + cls + '>');

        // swfobject v2+
        if (window.swfobject) {
            $(el).after($div).appendTo($div);
            if (!el.id) el.id = 'movie_player_' + counter++;

            // replace el with swfobject content
            swfobject.embedSWF(opts.src, el.id, opts.width, opts.height, opts.flashVersion,
                opts.expressInstaller, opts.flashvars, opts.params, opts.attrs);
        }
            // swfobject < v2
        else {
            $(el).after($div).remove();
            var so = new SWFObject(opts.src, 'movie_player_' + counter++, opts.width, opts.height, opts.flashVersion, opts.bgColor);
            if (opts.expressInstaller) so.useExpressInstall(opts.expressInstaller);

            for (var p in opts.params)
                if (p != 'bgColor') so.addParam(p, opts.params[p]);
            for (var f in opts.flashvars)
                so.addVariable(f, opts.flashvars[f]);
            so.write($div[0]);
        }

        if (opts.caption) $('<div>').appendTo($div).html(opts.caption);
        return $div;
    };

    // map flv and mp3 files to the swf player by default
    $.fn.media.flv = $.fn.media.mp3 = function (el, opts) {
        var src = opts.src;
        var player = /\.mp3\b/i.test(src) ? opts.mp3Player : opts.flvPlayer;
        var key = opts.flvKeyName;
        src = encodeURIComponent(src);
        opts.src = player;
        opts.src = opts.src + '?' + key + '=' + (src);
        var srcObj = {};
        srcObj[key] = src;
        opts.flashvars = $.extend({}, srcObj, opts.flashvars);
        return $.fn.media.swf(el, opts);
    };

    //
    //	Silverlight
    //
    $.fn.media.xaml = function (el, opts) {
        if (!window.Sys || !window.Sys.Silverlight) {
            if ($.fn.media.xaml.warning) return;
            $.fn.media.xaml.warning = 1;
            alert('You must include the Silverlight.js script.');
            return;
        }

        var props = {
            width: opts.width,
            height: opts.height,
            background: opts.bgColor,
            inplaceInstallPrompt: opts.silverlight.inplaceInstallPrompt,
            isWindowless: opts.silverlight.isWindowless,
            framerate: opts.silverlight.framerate,
            version: opts.silverlight.version
        };
        var events = {
            onError: opts.silverlight.onError,
            onLoad: opts.silverlight.onLoad
        };

        var id1 = el.id ? (' id="' + el.id + '"') : '';
        var id2 = opts.id || 'AG' + counter++;
        // convert element to div
        var cls = opts.cls ? (' class="' + opts.cls + '"') : '';
        var $div = $('<div' + id1 + cls + '>');
        $(el).after($div).remove();

        Sys.Silverlight.createObjectEx({
            source: opts.src,
            initParams: opts.silverlight.initParams,
            userContext: opts.silverlight.userContext,
            id: id2,
            parentElement: $div[0],
            properties: props,
            events: events
        });

        if (opts.caption) $('<div>').appendTo($div).html(opts.caption);
        return $div;
    };

    //
    // generate object/embed markup
    //
    function generate(el, opts, player) {
        var $el = $(el);
        var o = $.fn.media.defaults.players[player];

        if (player == 'iframe') {
            o = $('<iframe' + ' width="' + opts.width + '" height="' + opts.height + '" >');
            o.attr('src', opts.src);
            o.css('backgroundColor', o.bgColor);
        }
        else if (player == 'img') {
            o = $('<img>');
            o.attr('src', opts.src);
            opts.width && o.attr('width', opts.width);
            opts.height && o.attr('height', opts.height);
            o.css('backgroundColor', o.bgColor);
        }
        else if (lameIE) {
            var a = ['<object width="' + opts.width + '" height="' + opts.height + '" '];
            for (var key in opts.attrs)
                a.push(key + '="' + opts.attrs[key] + '" ');
            for (var key in o.ieAttrs || {}) {
                var v = o.ieAttrs[key];
                if (key == 'codebase' && window.location.protocol == 'https:')
                    v = v.replace('http', 'https');
                a.push(key + '="' + v + '" ');
            }
            a.push('></ob' + 'ject' + '>');
            var p = ['<param name="' + (o.oUrl || 'src') + '" value="' + opts.src + '">'];
            for (var key in opts.params)
                p.push('<param name="' + key + '" value="' + opts.params[key] + '">');
            var o = document.createElement(a.join(''));
            for (var i = 0; i < p.length; i++)
                o.appendChild(document.createElement(p[i]));
        }
        else if (opts.standards) {
            // Rewritten to be standards compliant by Richard Connamacher
            var a = ['<object type="' + o.mimetype + '" width="' + opts.width + '" height="' + opts.height + '"'];
            if (opts.src) a.push(' data="' + opts.src + '" ');
            if ($.browser.msie) {
                for (var key in o.ieAttrs || {}) {
                    var v = o.ieAttrs[key];
                    if (key == 'codebase' && window.location.protocol == 'https:')
                        v = v.replace('http', 'https');
                    a.push(key + '="' + v + '" ');
                }
            }
            a.push('>');
            a.push('<param name="' + (o.oUrl || 'src') + '" value="' + opts.src + '">');
            for (var key in opts.params) {
                if (key == 'wmode' && player != 'flash') // FF3/Quicktime borks on wmode
                    continue;
                a.push('<param name="' + key + '" value="' + opts.params[key] + '">');
            }
            // Alternate HTML
            a.push('<div><p><strong>' + o.title + ' Required</strong></p><p>' + o.title + ' is required to view this media. <a href="' + o.pluginspage + '">Download Here</a>.</p></div>');
            a.push('</ob' + 'ject' + '>');
        }
        else {
            var a = ['<embed width="' + opts.width + '" height="' + opts.height + '" style="display:block"'];
            if (opts.src) a.push(' src="' + opts.src + '" ');
            for (var key in opts.attrs)
                a.push(key + '="' + opts.attrs[key] + '" ');
            for (var key in o.eAttrs || {})
                a.push(key + '="' + o.eAttrs[key] + '" ');
            for (var key in opts.params) {
                if (key == 'wmode' && player != 'flash') // FF3/Quicktime borks on wmode
                    continue;
                a.push(key + '="' + opts.params[key] + '" ');
            }
            a.push('></em' + 'bed' + '>');
        }
        // convert element to div
        var id = el.id ? (' id="' + el.id + '"') : '';
        var cls = opts.cls ? (' class="' + opts.cls + '"') : '';
        var $div = $('<div' + id + cls + '>');
        $el.after($div).remove();
        (lameIE || player == 'iframe' || player == 'img') ? $div.append(o) : $div.html(a.join(''));
        if (opts.caption) $('<div>').appendTo($div).html(opts.caption);
        return $div;
    };


})(jQuery);
/*
 * Metadata - jQuery plugin for parsing metadata from elements
 *
 * Copyright (c) 2006 John Resig, Yehuda Katz, Jörn Zaefferer, Paul McLanahan
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Sets the type of metadata to use. Metadata is encoded in JSON, and each property
 * in the JSON will become a property of the element itself.
 *
 * There are three supported types of metadata storage:
 *
 *   attr:  Inside an attribute. The name parameter indicates *which* attribute.
 *          
 *   class: Inside the class attribute, wrapped in curly braces: { }
 *   
 *   elem:  Inside a child element (e.g. a script tag). The
 *          name parameter indicates *which* element.
 *          
 * The metadata for an element is loaded the first time the element is accessed via jQuery.
 *
 * As a result, you can define the metadata type, use $(expr) to load the metadata into the elements
 * matched by expr, then redefine the metadata type and run another $(expr) for other elements.
 * 
 * @name $.metadata.setType
 *
 * @example <p id="one" class="some_class {item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("class")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from the class attribute
 * 
 * @example <p id="one" class="some_class" data="{item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("attr", "data")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a "data" attribute
 * 
 * @example <p id="one" class="some_class"><script>{item_id: 1, item_label: 'Label'}</script>This is a p</p>
 * @before $.metadata.setType("elem", "script")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a nested script element
 * 
 * @param String type The encoding type
 * @param String name The name of the attribute to be used to get metadata (optional)
 * @cat Plugins/Metadata
 * @descr Sets the type of encoding to be used when loading metadata for the first time
 * @type undefined
 * @see metadata()
 */

(function ($) {

    $.extend({
        metadata: {
            defaults: {
                type: 'class',
                name: 'metadata',
                cre: /({.*})/,
                single: 'metadata'
            },
            setType: function (type, name) {
                this.defaults.type = type;
                this.defaults.name = name;
            },
            get: function (elem, opts) {
                var settings = $.extend({}, this.defaults, opts);
                // check for empty string in single property
                if (!settings.single.length) settings.single = 'metadata';

                var data = $.data(elem, settings.single);
                // returned cached data if it already exists
                if (data) return data;

                data = "{}";

                if (settings.type == "class") {
                    var m = settings.cre.exec(elem.className);
                    if (m)
                        data = m[1];
                } else if (settings.type == "elem") {
                    if (!elem.getElementsByTagName)
                        return undefined;
                    var e = elem.getElementsByTagName(settings.name);
                    if (e.length)
                        data = $.trim(e[0].innerHTML);
                } else if (elem.getAttribute != undefined) {
                    var attr = elem.getAttribute(settings.name);
                    if (attr)
                        data = attr;
                }

                if (data.indexOf('{') < 0)
                    data = "{" + data + "}";

                data = eval("(" + data + ")");

                $.data(elem, settings.single, data);
                return data;
            }
        }
    });

    /**
     * Returns the metadata object for the first member of the jQuery object.
     *
     * @name metadata
     * @descr Returns element's metadata object
     * @param Object opts An object contianing settings to override the defaults
     * @type jQuery
     * @cat Plugins/Metadata
     */
    $.fn.metadata = function (opts) {
        return $.metadata.get(this[0], opts);
    };

})(jQuery);
/*
 * simpleWeather
 * http://simpleweather.monkeecreate.com
 *
 * A simple jQuery plugin to display the current weather
 * information for any location using Yahoo! Weather.
 *
 * Developed by James Fleeting <@twofivethreetwo>
 * Another project from monkeeCreate <http://monkeecreate.com>
 *
 * Version 2.1.2 - Last updated: January 25 2013
 */
(function ($) { "use strict"; $.extend({ simpleWeather: function (options) { options = $.extend({ zipcode: '', woeid: '2357536', location: '', unit: 'f', success: function (weather) { }, error: function (message) { } }, options); var now = new Date(); var weatherUrl = 'http://query.yahooapis.com/v1/public/yql?format=json&rnd=' + now.getFullYear() + now.getMonth() + now.getDay() + now.getHours() + '&diagnostics=true&callback=?&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q='; if (options.location !== '') { weatherUrl += 'select * from weather.forecast where location in (select id from weather.search where query="' + options.location + '") and u="' + options.unit + '"' } else if (options.zipcode !== '') { weatherUrl += 'select * from weather.forecast where location in ("' + options.zipcode + '") and u="' + options.unit + '"' } else if (options.woeid !== '') { weatherUrl += 'select * from weather.forecast where woeid=' + options.woeid + ' and u="' + options.unit + '"' } else { options.error("Could not retrieve weather due to an invalid WOEID or location."); return false } $.getJSON(weatherUrl, function (data) { if (data !== null && data.query.results !== null) { $.each(data.query.results, function (i, result) { if (result.constructor.toString().indexOf("Array") !== -1) { result = result[0] } var currentDate = new Date(); var sunRise = new Date(currentDate.toDateString() + ' ' + result.astronomy.sunrise); var sunSet = new Date(currentDate.toDateString() + ' ' + result.astronomy.sunset); if (currentDate > sunRise && currentDate < sunSet) { var timeOfDay = 'd' } else { var timeOfDay = 'n' } var compass = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N']; var windDirection = compass[Math.round(result.wind.direction / 22.5)]; if (result.item.condition.temp < 80 && result.atmosphere.humidity < 40) { var heatIndex = -42.379 + 2.04901523 * result.item.condition.temp + 10.14333127 * result.atmosphere.humidity - 0.22475541 * result.item.condition.temp * result.atmosphere.humidity - 6.83783 * (Math.pow(10, -3)) * (Math.pow(result.item.condition.temp, 2)) - 5.481717 * (Math.pow(10, -2)) * (Math.pow(result.atmosphere.humidity, 2)) + 1.22874 * (Math.pow(10, -3)) * (Math.pow(result.item.condition.temp, 2)) * result.atmosphere.humidity + 8.5282 * (Math.pow(10, -4)) * result.item.condition.temp * (Math.pow(result.atmosphere.humidity, 2)) - 1.99 * (Math.pow(10, -6)) * (Math.pow(result.item.condition.temp, 2)) * (Math.pow(result.atmosphere.humidity, 2)) } else { var heatIndex = result.item.condition.temp } if (options.unit === "f") { var tempAlt = Math.round((5.0 / 9.0) * (result.item.condition.temp - 32.0)) } else { var tempAlt = Math.round((9.0 / 5.0) * result.item.condition.temp + 32.0) } var weather = { title: result.item.title, temp: result.item.condition.temp, tempAlt: tempAlt, code: result.item.condition.code, todayCode: result.item.forecast[0].code, units: { temp: result.units.temperature, distance: result.units.distance, pressure: result.units.pressure, speed: result.units.speed }, currently: result.item.condition.text, high: result.item.forecast[0].high, low: result.item.forecast[0].low, forecast: result.item.forecast[0].text, wind: { chill: result.wind.chill, direction: windDirection, speed: result.wind.speed }, humidity: result.atmosphere.humidity, heatindex: heatIndex, pressure: result.atmosphere.pressure, rising: result.atmosphere.rising, visibility: result.atmosphere.visibility, sunrise: result.astronomy.sunrise, sunset: result.astronomy.sunset, description: result.item.description, thumbnail: "http://l.yimg.com/a/i/us/nws/weather/gr/" + result.item.condition.code + timeOfDay + "s.png", image: "http://l.yimg.com/a/i/us/nws/weather/gr/" + result.item.condition.code + timeOfDay + ".png", tomorrow: { high: result.item.forecast[1].high, low: result.item.forecast[1].low, forecast: result.item.forecast[1].text, code: result.item.forecast[1].code, date: result.item.forecast[1].date, day: result.item.forecast[1].day, image: "http://l.yimg.com/a/i/us/nws/weather/gr/" + result.item.forecast[1].code + "d.png" }, city: result.location.city, country: result.location.country, region: result.location.region, updated: result.item.pubDate, link: result.item.link }; options.success(weather) }) } else { if (data.query.results === null) { options.error("An invalid WOEID or location was provided.") } else { options.error("There was an error retrieving the latest weather information. Please try again.") } } }); return this } }) })(jQuery);
