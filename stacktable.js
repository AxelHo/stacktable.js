/**
 * stacktable.js
 * Author & copyright (c) 2012: John Polacek
 * Dual MIT & GPL license
 *
 * Page: http://johnpolacek.github.com/stacktable.js
 * Repo: https://github.com/johnpolacek/stacktable.js/
 * mod AxelHo
 * Repo  https://github.com/AxelHo/stacktable.js.git
 * Coremedia styles
 * jQuery plugin for stacking tables on small screens
 *
 *
 */


;(function($) {

    $.fn.stacktable = function(options) {
        var $tables = this,
          pName="Stacktable: ",
          defaults = {id:'stacktable',hideOriginal:false,cssClass:'table table-striped'},
          settings = $.extend({}, defaults, options),
          stacktable;

        return $tables.each(function() {
            var $stacktable = $('<table class="'+settings.id+'"><tbody></tbody></table>');
            if (typeof settings.cssClass !== undefined) $stacktable.addClass(settings.cssClass);
            var markup = '';
            $table = $(this);
            $topRow = $table.find('tr').first();
            $table.find('tr').each(function(index,value) {
                markup += '<tr>';
                // for the first row, top left table cell is the head of the table
                if (index===0) {
                    headRowMain=$(this).find('tr:first,td').first().html();
                }
                // for the other rows, put the left table cell as the head for that row
                // then iterate through the key/values
                else {
                    var tdTotal =  $(this).find('td').length;
                    $(this).find('td').each(function(index,value) {
                        if (index===0) {
                            // Repeat headRowMain as title in every row
                            markup += '<tr class="head-row"><th>' +headRowMain + '</th><th>' +$(this).html()+'</th></tr>';
                        } else {
                            if ($(this).html() !== ''){
                                var stRow= (index%2 == 0)?'odd':'even';
                                markup += '<tr class="row-'  +  stRow + '">';
                                stKeyText=$topRow.find('td,tr:first').eq(index).html()?$topRow.find('td,tr:first').eq(index).html():'';
                                markup += '<td class="st-key">'+stKeyText+'</td>';
                                markup += '<td class="st-val">'+$(this).html()+'</td>';
                                markup += '</tr>';
                                // extra markup for last element
                                markup += (index == tdTotal - 1)?'<tr class="st-index-last"><td  style="border-top: 2px solid #333" colspan="2">&nbsp;</td></tr>':'';

                            }
                        }
                    });
                }
            });
            $stacktable.append($(markup));
            $table.before($stacktable);
            if (settings.hideOriginal) $table.hide();
        });
    };

}(jQuery));
