var $ = jQuery.noConflict(),
	$window = $(window),
	windowWidth = $window.width(),
body = document.body;

$(document).ready(function(){
    toggleSidebar();
});

    // Toggle Sidebar 
    function toggleSidebar() {
        var navbar = $(".collapsedSidebar");
        var openBtn = $(".open-btn");
        var closeBtn = $(".collapsedSidebar .closeNavbar");

        closeBtn.on("click", function() {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
                setTimeout(function () {
                    openBtn.removeClass("d-none");
                }, 250);
            }
            $('body').removeClass('body-overlay overflowhidden');
            return false; 
        })

        openBtn.on("click", function(e) {
            e.stopImmediatePropagation();
            navbar.toggleClass("slideInn");
            $('body').addClass('body-overlay overflowhidden');
            $(this).addClass('d-none');
            return false;
        })
    }
    
    //Blackmode 
    $(function(){
        $('.colorChangeMode').click(function(){
            $('body').toggleClass('blackMode');
        });
    });

    // Date rangepicker
    $(function() {

        var start = moment().subtract(29, 'days');
        var end = moment();
    
        function cb(start, end) {
            // $('#reportrange').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        }
    
        $('#reportrange').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
               'Today': [moment(), moment()],
               'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
               'Last 7 Days': [moment().subtract(6, 'days'), moment()],
               'Last 30 Days': [moment().subtract(29, 'days'), moment()],
               'This Month': [moment().startOf('month'), moment().endOf('month')],
               'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, cb);
    
        cb(start, end);
    
    });