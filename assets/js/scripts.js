jQuery(document).ready(function() {
    "use strict";
    // Top level variables
    var Window = jQuery(window),
        WindowWidth = Window.width(),
        WindowHeight = Window.height();
    // Functions inits
    twophat_preload_site();
    twophat_monitor_window();
    twophat_header_floating();
    twophat_navigation();
    twophat_aside();
    twophat_mobile_navigation();
    twophat_search();
    twophat_recipes_slider();
    twophat_post_media_gallery();
    twophat_fitvids();
    twophat_isotope();
    twophat_flickr_feed();
    twophat_instagram_feed();
    twophat_back_top();
    twophat_show_share_links();
    twophat_contact_form();
    // Functions declarations
    function twophat_preload_site() {
        var PreloaderWrapper = jQuery('#twophat-preloader-wrapper'),
            PreloaderProgress = PreloaderWrapper.find('.preloader-progress'),
            SiteImages = jQuery('img'),
            PreloaderWidthPerImage = Math.ceil(100 / SiteImages.length),
            PreloadedImages = 0,
            ProgressWidth = PreloaderProgress.data('loaded');
        if (SiteImages.length <= 0) {
            close_preloader();
            PreloaderProgress.width('100%').data('loaded', 100);
        }
        SiteImages.each(function() {
            imagesLoaded(jQuery(this), function() {
                PreloadedImages++;
                ProgressWidth = PreloaderProgress.data('loaded') + PreloaderWidthPerImage;
                PreloaderProgress.width(ProgressWidth + '%').data('loaded', ProgressWidth);
                if (PreloadedImages >= SiteImages.length) {
                    setTimeout(function() {
                        close_preloader();
                    }, 200);
                }
            });
        });
        setTimeout(function() {
            if (jQuery('body').hasClass('loading')) {
                close_preloader();
            }
        }, 10000);

        function close_preloader() {
            setTimeout(function() {
                PreloaderProgress.width('100%').data('loaded', 100);
                PreloaderWrapper.addClass('hidden');
                jQuery('body').removeClass('loading');
                setTimeout(function() {
                    PreloaderWrapper.detach();
                }, 700);
            }, 600);
        }
    }

    function twophat_monitor_window() {
        jQuery(window).on("debouncedresize", function() {
            WindowWidth = jQuery(window).width();
            WindowHeight = jQuery(window).height();
        });
    }

    function twophat_header_floating() {
        var SiteHeader = jQuery('#twophat-header-wrapper');
        var SiteHeaderBorder = jQuery('.header-bottom-border');
        var ScrollFromTop = jQuery(window).scrollTop();
        if (SiteHeader.hasClass('sticky')) {
            handle_header_classes();
            jQuery(window).on('debouncedresize scroll', function() { handle_header_classes(); });
        }

        function handle_header_classes() {
            ScrollFromTop = jQuery(window).scrollTop();
            if (ScrollFromTop > 0) {
                SiteHeader.addClass('floating');
                SiteHeaderBorder.addClass('hidden');
            } else {
                SiteHeader.removeClass('floating');
                SiteHeaderBorder.removeClass('hidden');
            }
        }
    }

    function twophat_navigation() {
        var SiteHeader = jQuery('#twophat-header'),
            DesktopNavigationHolder = SiteHeader.find('.header-navigation-wrapper'),
            DesktopNavigation = DesktopNavigationHolder.find('.main-navigation'),
            MobileNavigationHolder = jQuery('.header-mobile-navigation-wrapper'),
            MinimalHeaderWidth = 40,
            MinimalWindowWidth = 0;
        if (DesktopNavigationHolder.hasClass('always-mobile')) { return; }
        DesktopNavigation.find('.menu-item.menu-item-has-children').each(function() {
            jQuery(this).hoverIntent({
                over: function() {
                    jQuery(this).siblings().find('.sub-menu').removeClass('visible');
                    jQuery(this).find('> .sub-menu').addClass('visible');
                },
                out: function() {
                    jQuery(this).find('> .sub-menu').removeClass('visible');
                },
                timeout: 800
            });
        });
        SiteHeader.children('.header-column').each(function() {
            MinimalHeaderWidth += jQuery(this).outerWidth();
        });
        twophat_monitor_navigation();
        jQuery(window).on("debouncedresize", function() { twophat_monitor_navigation(); });

        function twophat_submenu_offset() {
            DesktopNavigation.find('.sub-menu').each(function() {
                if (MinimalWindowWidth < (jQuery(this).offset().left + jQuery(this).outerWidth())) {
                    MinimalWindowWidth = jQuery(this).offset().left + jQuery(this).outerWidth();
                }
            });
        }

        function twophat_monitor_navigation() {
            twophat_submenu_offset();
            if (WindowWidth <= 600) {
                DesktopNavigationHolder.addClass('hidden');
                MobileNavigationHolder.removeClass('hidden');
                return;
            }
            if (WindowWidth < MinimalWindowWidth + 40) {
                DesktopNavigationHolder.addClass('hidden');
                MobileNavigationHolder.removeClass('hidden');
            } else if (SiteHeader.width() < MinimalHeaderWidth) {
                DesktopNavigationHolder.addClass('hidden');
                MobileNavigationHolder.removeClass('hidden');
            } else {
                DesktopNavigationHolder.removeClass('hidden');
                MobileNavigationHolder.addClass('hidden');
            }
        }
    }

    function twophat_aside() {
        var ShowAsideButton = jQuery('#show-aside-btn'),
            CloseAsideButton = jQuery('#close-aside-btn'),
            AsideDeactivator = jQuery('#twophat-overlay-deactivator'),
            SiteBody = jQuery('body');
        ShowAsideButton.click(function(e) {
            e.preventDefault();
            SiteBody.addClass('show-aside');
            AsideDeactivator.addClass('active');
        });
        CloseAsideButton.click(function(e) {
            e.preventDefault();
            SiteBody.removeClass('show-aside');
            AsideDeactivator.removeClass('active');
        });
        AsideDeactivator.click(function(e) {
            if (SiteBody.hasClass('show-aside')) {
                e.preventDefault();
                SiteBody.removeClass('show-aside');
                AsideDeactivator.removeClass('active');
            }
        });
    }

    function twophat_mobile_navigation() {
        var ShowNavigationButton = jQuery('#show-mobile-navigation-btn'),
            CloseNavigationButton = jQuery('#close-mobile-navigation-btn'),
            AsideDeactivator = jQuery('#twophat-overlay-deactivator'),
            SiteBody = jQuery('body');
        ShowNavigationButton.click(function(e) {
            e.preventDefault();
            SiteBody.addClass('show-mobile-navigation');
            AsideDeactivator.addClass('active');
        });
        CloseNavigationButton.click(function(e) {
            e.preventDefault();
            SiteBody.removeClass('show-mobile-navigation');
            AsideDeactivator.removeClass('active');
        });
        AsideDeactivator.click(function(e) {
            if (SiteBody.hasClass('show-mobile-navigation')) {
                e.preventDefault();
                SiteBody.removeClass('show-mobile-navigation');
                AsideDeactivator.removeClass('active');
            }
        });
    }

    function twophat_search() {
        var ShowSearchButton = jQuery('#show-search-btn'),
            CloseSearchButton = jQuery('#close-search-btn'),
            AsideDeactivator = jQuery('#twophat-overlay-deactivator'),
            SiteBody = jQuery('body'),
            AsideSearchForm = jQuery('#aside-search-form'),
            AsideSearchFormInput = AsideSearchForm.find('.search-query-input'),
            AsideSearchFormSelect = AsideSearchForm.find('.search-type-select'),
            AsideSearchResponseWrapper = jQuery('#search-response-wrapper');
        ShowSearchButton.click(function(e) {
            e.preventDefault();
            SiteBody.addClass('show-search');
            AsideDeactivator.addClass('active');
        });
        CloseSearchButton.click(function(e) {
            e.preventDefault();
            SiteBody.removeClass('show-search');
            AsideDeactivator.removeClass('active');
        });
        AsideDeactivator.click(function(e) {
            if (SiteBody.hasClass('show-search')) {
                e.preventDefault();
                SiteBody.removeClass('show-search');
                AsideDeactivator.removeClass('active');
            }
        });
        AsideSearchForm.submit(function(e) {
            e.preventDefault();
            if (AsideSearchForm.hasClass('working')) { return; } else { AsideSearchForm.addClass('working'); }
            var SearchQuery = AsideSearchFormInput.val().trim(),
                SearchType = AsideSearchFormSelect.val();
            if (SearchQuery === null || SearchQuery === '') {
                AsideSearchFormInput.addClass('error');
                AsideSearchForm.removeClass('working');
                return;
            } else {
                AsideSearchFormInput.removeClass('error');
            }
            if (SearchQuery === AsideSearchFormInput.data('LastSearchQuery') && SearchType === AsideSearchFormSelect.data('LastSearchType')) {
                AsideSearchForm.removeClass('working');
                return;
            } else {
                AsideSearchFormInput.data('LastSearchQuery', SearchQuery);
                AsideSearchFormSelect.data('LastSearchType', SearchType);
            }
            AsideSearchResponseWrapper.removeClass('visible');
            jQuery.post(
                SpaceAjax.Url, {
                    action: 'twophat_get_aside_search_ajax',
                    'Nonce': SpaceAjax.SpaceNonce,
                    'SearchQuery': SearchQuery,
                    'SearchType': SearchType
                },
                function(response) {
                    response = jQuery(response);
                    setTimeout(function() {
                        AsideSearchResponseWrapper.empty().append(response).addClass('visible');
                        AsideSearchForm.removeClass('working');
                    }, 400);
                }
            );
        });
    }

    function twophat_recipes_slider() {
        var RecipesSlider = jQuery('#twophat-recipes-slider-wrapper'),
            SliderElementsWrapper = RecipesSlider.find('.slider-elements'),
            SliderElements = RecipesSlider.find('.slider-elements .slide'),
            SliderControlsPagination = RecipesSlider.find('.slider-controls .slide-control.pagination'),
            SliderControlsNavigation = RecipesSlider.find('.slider-controls .slide-control.navigation'),
            HeaderBorder = jQuery('.header-bottom-border'),
            AutoRotate = RecipesSlider.data('autorotate'),
            AutoRotateDelay = parseInt(RecipesSlider.data('rotatedelay'), 10),
            AutoRotateTimeout = setInterval(function() { auto_rotate_slide(); }, AutoRotateDelay);
        SliderControlsPagination.click(function(e) {
            e.preventDefault();
            var ThisControl = jQuery(this);
            if (ThisControl.hasClass('working') || ThisControl.hasClass('current')) {
                return;
            } else {
                SliderControlsPagination.addClass('working');
                SliderControlsNavigation.addClass('working');
            }
            SliderControlsPagination.removeClass('current');
            ThisControl.addClass('current');
            change_slide(SliderElements.filter('#' + ThisControl.data('target')));
            setTimeout(function() {
                SliderControlsPagination.removeClass('working');
                SliderControlsNavigation.removeClass('working');
            }, 700);
        });
        SliderControlsNavigation.click(function(e) {
            e.preventDefault();
            var ThisControl = jQuery(this);
            if (ThisControl.hasClass('working') || ThisControl.hasClass('current')) {
                return;
            } else {
                SliderControlsPagination.addClass('working');
                SliderControlsNavigation.addClass('working');
            }
            var CurrentPagination = SliderControlsPagination.filter('.current');
            var TargetPagination = jQuery();
            if (ThisControl.hasClass('next-control')) {
                TargetPagination = CurrentPagination.next('.pagination');
                if (!TargetPagination.length) { TargetPagination = SliderControlsPagination.first(); }
            } else {
                TargetPagination = CurrentPagination.prev('.pagination');
                if (!TargetPagination.length) { TargetPagination = SliderControlsPagination.last(); }
            }
            SliderControlsPagination.removeClass('current');
            change_slide(SliderElements.filter('#' + TargetPagination.data('target')));
            TargetPagination.addClass('current');
            setTimeout(function() {
                SliderControlsPagination.removeClass('working');
                SliderControlsNavigation.removeClass('working');
            }, 700);
        });
        RecipesSlider.hoverIntent({
            over: function() {
                clearInterval(AutoRotateTimeout);
            },
            out: function() {
                AutoRotateTimeout = setInterval(function() { auto_rotate_slide(); }, AutoRotateDelay);
            },
            timeout: 300
        });
        RecipesSlider.swipe({
            swipeLeft: function(e) {
                e.preventDefault();
                var ThisControl = SliderControlsPagination.filter('.current');
                var NextControl = ThisControl.next();
                if (!NextControl.length) { NextControl = SliderControlsPagination.first(); }
                if (ThisControl.is(NextControl)) { return; }
                NextControl.click();
            },
            swipeRight: function(e) {
                e.preventDefault();
                var ThisControl = SliderControlsPagination.filter('.current');
                var PrevControl = ThisControl.prev();
                if (!PrevControl.length) { PrevControl = SliderControlsPagination.last(); }
                if (ThisControl.is(PrevControl)) { return; }
                PrevControl.click();
            }
        });

        function change_slide(NewSlide) {
            var CurrentSlide = SliderElements.filter('.current');
            if (CurrentSlide.is(NewSlide)) { return; }
            CurrentSlide.removeClass('current');
            NewSlide.addClass('current');
        }

        function auto_rotate_slide() {
            if (AutoRotate === false) { return; }
            var ThisControl = SliderControlsPagination.filter('.current');
            var NextControl = ThisControl.next();
            if (!NextControl.length) { NextControl = SliderControlsPagination.first(); }
            if (ThisControl.is(NextControl)) { return; }
            NextControl.click();
        }
        resize_slider();
        jQuery(window).on("debouncedresize", function() { resize_slider(); });

        function resize_slider() {
            var HighestSlide = 0;
            var SliderHeight = WindowHeight - parseInt(jQuery('html').css('marginTop'), 10);
            var HeaderBorderTop = parseInt(HeaderBorder.css('top')) + 40;
            if (RecipesSlider.data('height') === 'half_screen') { SliderHeight = SliderHeight / 2; }
            SliderElements.each(function() {
                var ThisSlideHeight = jQuery(this).find('.slide-overlay').height();
                if (ThisSlideHeight > HighestSlide) { HighestSlide = ThisSlideHeight; }
            });
            HighestSlide = HighestSlide + HeaderBorderTop + 112; // top and bottom spacing for header and controls
            if (HighestSlide > SliderHeight) {
                SliderElementsWrapper.height(HighestSlide);
            } else {
                SliderElementsWrapper.height(SliderHeight);
            }
        }
    }

    function twophat_post_media_gallery() {
        var PostGallery = jQuery('.post-media.media-gallery');
        if (PostGallery.length < 1) { return; }
        PostGallery.each(function() {
            var GalleryElements = jQuery(this).find('.gallery-elements .gallery-element');
            var GalleryNextControl = jQuery(this).find('.gallery-elements .control.next');
            var GalleryPrevControl = jQuery(this).find('.gallery-elements .control.prev');
            resize_gallery();
            GalleryNextControl.click(function(e) {
                if (GalleryNextControl.hasClass('working')) { return; }
                e.preventDefault();
                var OldElement = GalleryElements.filter('.active');
                var NewElement = OldElement.next();
                if (!NewElement.length) { NewElement = GalleryElements.first(); }
                swap_elements(OldElement, NewElement);
            });
            GalleryPrevControl.click(function(e) {
                if (GalleryPrevControl.hasClass('working')) { return; }
                e.preventDefault();
                var OldElement = GalleryElements.filter('.active');
                var NewElement = OldElement.prev();
                if (!NewElement.length) { NewElement = GalleryElements.last(); }
                swap_elements(OldElement, NewElement);
            });
            jQuery(this).swipe({
                swipeLeft: function(e) {
                    if (GalleryNextControl.hasClass('working')) { return; }
                    e.preventDefault();
                    var OldElement = GalleryElements.filter('.active');
                    var NewElement = OldElement.next();
                    if (!NewElement.length) { NewElement = GalleryElements.first(); }
                    swap_elements(OldElement, NewElement);
                },
                swipeRight: function(e) {
                    if (GalleryPrevControl.hasClass('working')) { return; }
                    e.preventDefault();
                    var OldElement = GalleryElements.filter('.active');
                    var NewElement = OldElement.prev();
                    if (!NewElement.length) { NewElement = GalleryElements.last(); }
                    swap_elements(OldElement, NewElement);
                }
            });
            jQuery(window).on("debouncedresize", function() {
                resize_gallery();
            });

            function swap_elements(OldElement, NewElement) {
                GalleryNextControl.addClass('working');
                GalleryPrevControl.addClass('working');
                OldElement.removeClass('active');
                NewElement.addClass('active');
                resize_gallery();
                setTimeout(function() {
                    GalleryNextControl.removeClass('working');
                    GalleryPrevControl.removeClass('working');
                }, 400);
            }

            function resize_gallery() {
                var ActiveElementHeight = GalleryElements.filter('.active').find('img').height();
                if (ActiveElementHeight > 0) {
                    PostGallery.height(ActiveElementHeight);
                    var ParentIsotope = PostGallery.parents('.isotope-wrapper');
                    if (ParentIsotope.length > 0) {
                        if (ParentIsotope.data('isotope')) {
                            ParentIsotope.isotope('layout');
                        }
                    }
                } else {
                    setTimeout(function() {
                        resize_gallery();
                    }, 100);
                }
            }
        });
    }

    function twophat_fitvids() {
        jQuery('#twophat-site').fitVids();
    }

    function twophat_isotope() {
        var GridWrapper = jQuery('.isotope-wrapper'),
            GridElements = GridWrapper.find('.isotope-element'),
            GridWrapperWidth = GridWrapper.width(),
            GridColumns = 3;
        calculate_columns();
        GridWrapper.isotope({
            itemSelector: '.isotope-element',
            transitionDuration: '0.3s',
            masonry: {
                columnWidth: '.isotope-element'
            }
        });
        GridWrapper.imagesLoaded(function() {
            if (GridWrapper.data('isotope')) {
                GridWrapper.isotope('layout');
            }
        });
        jQuery(window).on("debouncedresize", function() {
            calculate_columns();
        });

        function calculate_columns() {
            if (GridElements.hasClass('recipe-grid-wrapper') || GridElements.hasClass('post-grid-wrapper')) {
                GridWrapperWidth = GridWrapper.width();
                if (GridWrapperWidth <= 600) {
                    GridColumns = 1;
                } else if (GridWrapperWidth > 600 && GridWrapperWidth <= 1100) {
                    GridColumns = 2;
                } else if (GridWrapperWidth > 1100 && GridWrapperWidth <= 1600) {
                    GridColumns = 3;
                } else if (GridWrapperWidth > 1600 && GridWrapperWidth <= 2100) {
                    GridColumns = 4;
                } else if (GridWrapperWidth > 2100 && GridWrapperWidth <= 2600) {
                    GridColumns = 5;
                }
                GridElements.outerWidth(Math.floor(GridWrapperWidth / GridColumns));
            }
            if (GridWrapper.data('isotope')) {
                GridWrapper.isotope('layout');
            }
        }
    }

    function twophat_flickr_feed() {
        var PhotosWrapper = jQuery('#twophat-flickr-footer-wrapper');
        if (PhotosWrapper.find('.photo').length <= 0 || PhotosWrapper.find('.flickr-error').length >= 1) { return; }
        var Photos = PhotosWrapper.find('.photo'),
            AutoRotate = PhotosWrapper.data('autorotate'),
            AutoRotateDelay = parseInt(PhotosWrapper.data('rotatedelay'), 10),
            AutoRotateTimeout = setInterval(function() { auto_rotate_photos(); }, AutoRotateDelay);
        PhotosWrapper.hoverIntent({
            over: function() {
                clearInterval(AutoRotateTimeout);
            },
            out: function() {
                AutoRotateTimeout = setInterval(function() { auto_rotate_photos(); }, AutoRotateDelay);
            },
            timeout: 400
        });
        clone_to_fill();
        wrapper_resize();
        jQuery(window).on("debouncedresize", function() { clone_to_fill();
            wrapper_resize(); });
        PhotosWrapper.swipe({
            swipeLeft: function(e) {
                e.preventDefault();
                rotate_to_right();
            },
            swipeRight: function(e) {
                e.preventDefault();
                rotate_to_left();
            },
            excludedElements: []
        });

        function wrapper_resize() {
            imagesLoaded(PhotosWrapper, function() {
                PhotosWrapper.height(Photos.height());
            });
        }

        function clone_to_fill() {
            Photos = PhotosWrapper.find('.photo');
            if (((Photos.length - 2) * Photos.width()) >= WindowWidth) { return; }
            Photos.each(function() {
                var PhotoClone = jQuery(this).clone(false, false);
                PhotoClone.addClass('no-animate clone');
                PhotosWrapper.append(PhotoClone);
                PhotoClone.removeClass('no-animate');
            });
            clone_to_fill();
        }

        function auto_rotate_photos() {
            if (AutoRotate === false) { return; }
            rotate_to_right();
        }

        function rotate_to_right() {
            if (PhotosWrapper.hasClass('working')) { return; } else { PhotosWrapper.addClass('working'); }
            var FirstPhoto = PhotosWrapper.find('.photo').first();
            FirstPhoto.css({ marginLeft: -FirstPhoto.width() });
            setTimeout(function() {
                FirstPhoto.detach();
                FirstPhoto.css({ marginLeft: 0 });
                PhotosWrapper.append(FirstPhoto);
                PhotosWrapper.removeClass('working');
            }, 400);
        }

        function rotate_to_left() {
            if (PhotosWrapper.hasClass('working')) { return; } else { PhotosWrapper.addClass('working'); }
            var LastPhoto = PhotosWrapper.find('.photo').last(),
                LastPhotoWidth = LastPhoto.width();
            LastPhoto.detach();
            LastPhoto.css({ marginLeft: -LastPhotoWidth });
            PhotosWrapper.prepend(LastPhoto);
            setTimeout(function() {
                LastPhoto.css({ marginLeft: 0 });
            }, 10);
            setTimeout(function() {
                PhotosWrapper.removeClass('working');
            }, 410);
        }
    }

    function twophat_instagram_feed() {
        var PhotosWrapper = jQuery('#twophat-instagram-footer-wrapper');
        if (PhotosWrapper.find('.photo').length <= 0 || PhotosWrapper.find('.flickr-error').length >= 1) { return; }
        var Photos = PhotosWrapper.find('.photo'),
            AutoRotate = PhotosWrapper.data('autorotate'),
            AutoRotateDelay = parseInt(PhotosWrapper.data('rotatedelay'), 10),
            AutoRotateTimeout = setInterval(function() { auto_rotate_photos(); }, AutoRotateDelay);
        PhotosWrapper.hoverIntent({
            over: function() {
                clearInterval(AutoRotateTimeout);
            },
            out: function() {
                AutoRotateTimeout = setInterval(function() { auto_rotate_photos(); }, AutoRotateDelay);
            },
            timeout: 400
        });
        clone_to_fill();
        wrapper_resize();
        jQuery(window).on("debouncedresize", function() { clone_to_fill();
            wrapper_resize(); });
        PhotosWrapper.swipe({
            swipeLeft: function(e) {
                e.preventDefault();
                rotate_to_right();
            },
            swipeRight: function(e) {
                e.preventDefault();
                rotate_to_left();
            },
            excludedElements: []
        });

        function wrapper_resize() {
            imagesLoaded(PhotosWrapper, function() {
                PhotosWrapper.height(Photos.height());
            });
        }

        function clone_to_fill() {
            Photos = PhotosWrapper.find('.photo');
            if (((Photos.length - 2) * Photos.width()) >= WindowWidth) { return; }
            Photos.each(function() {
                var PhotoClone = jQuery(this).clone(false, false);
                PhotoClone.addClass('no-animate clone');
                PhotosWrapper.append(PhotoClone);
                PhotoClone.removeClass('no-animate');
            });
            clone_to_fill();
        }

        function auto_rotate_photos() {
            if (AutoRotate === false) { return; }
            rotate_to_right();
        }

        function rotate_to_right() {
            if (PhotosWrapper.hasClass('working')) { return; } else { PhotosWrapper.addClass('working'); }
            var FirstPhoto = PhotosWrapper.find('.photo').first();
            FirstPhoto.css({ marginLeft: -FirstPhoto.width() });
            setTimeout(function() {
                FirstPhoto.detach();
                FirstPhoto.css({ marginLeft: 0 });
                PhotosWrapper.append(FirstPhoto);
                PhotosWrapper.removeClass('working');
            }, 400);
        }

        function rotate_to_left() {
            if (PhotosWrapper.hasClass('working')) { return; } else { PhotosWrapper.addClass('working'); }
            var LastPhoto = PhotosWrapper.find('.photo').last(),
                LastPhotoWidth = LastPhoto.width();
            LastPhoto.detach();
            LastPhoto.css({ marginLeft: -LastPhotoWidth });
            PhotosWrapper.prepend(LastPhoto);
            setTimeout(function() {
                LastPhoto.css({ marginLeft: 0 });
            }, 10);
            setTimeout(function() {
                PhotosWrapper.removeClass('working');
            }, 410);
        }
    }

    function twophat_back_top() {
        var BackToTopBtn = jQuery('#back-top-btn');
        BackToTopBtn.click(function(e) {
            e.preventDefault();
            jQuery('html, body').animate({ scrollTop: 0 }, 'slow');
            return false;
        });
    }

    function twophat_show_share_links() {
        var PostShareLabel = jQuery('.post-share .share-label');
        var PostShareLinks = jQuery('.post-share .share-links');
        PostShareLabel.hoverIntent({
            over: function() {
                PostShareLinks.addClass('visible');
            },
            out: function() {
                PostShareLinks.removeClass('visible');
            },
            timeout: 400
        });
    }

    function twophat_contact_form() {
        var FormValid = false;
        var ContactFormHolder = jQuery('#twophat-contact-form-holder');
        var ContactForm = jQuery('#twophat-contact-form');
        var ContactName = ContactForm.find('#contact-name');
        var NameValid = false;
        var ContactEmail = ContactForm.find('#contact-email');
        var EmailValid = false;
        var ContactMessage = ContactForm.find('#contact-message');
        var MessageValid = false;
        ContactName.on('focus', function() { ContactName.removeClass('error'); });
        ContactEmail.on('focus', function() { ContactEmail.removeClass('error'); });
        ContactMessage.on('focus', function() { ContactMessage.removeClass('error'); });
        ContactForm.on('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (ContactName.val() === '') {
                NameValid = false;
                ContactName.addClass('error');
            } else {
                NameValid = true;
                ContactName.removeClass('error');
            }
            if (ContactEmail.val() === '') {
                EmailValid = false;
                ContactEmail.addClass('error');
            } else if (!twophat_is_valid_email(ContactEmail.val())) {
                EmailValid = false;
                ContactEmail.addClass('error');
            } else {
                EmailValid = true;
                ContactEmail.removeClass('error');
            }
            if (ContactMessage.val() === '') {
                MessageValid = false;
                ContactMessage.addClass('error');
            } else {
                MessageValid = true;
                ContactMessage.removeClass('error');
            }
            if (NameValid && EmailValid && MessageValid) {
                FormValid = true;
            } else {
                FormValid = false;
            }
            if (FormValid) {
                if (ContactFormHolder.hasClass('working')) { return; } else { ContactFormHolder.addClass('working sending'); }
                jQuery.post(
                    SpaceAjax.Url, {
                        action: 'twophat_send_contact_message',
                        'Nonce': SpaceAjax.SpaceNonce,
                        'Name': ContactName.val(),
                        'Email': ContactEmail.val(),
                        'Message': ContactMessage.val()
                    },
                    function(response) {
                        ContactFormHolder.removeClass('sending');
                        if (response === '-1') {
                            ContactFormHolder.addClass('spam');
                            setTimeout(function() { ContactFormHolder.removeClass('working spam'); }, 5000);
                        } else if (response === '1') {
                            ContactFormHolder.addClass('delivered');
                        } else {
                            ContactFormHolder.addClass('error');
                            setTimeout(function() { ContactFormHolder.removeClass('working error'); }, 5000);
                        }
                    }
                );
            }
        });
    }

    function twophat_is_valid_email(EmailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/g);
        return pattern.test(EmailAddress);
    }
});