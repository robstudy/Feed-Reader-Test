/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    //Text RSS Feeds allFeeds array
    describe('RSS Feeds', function() {
        /* Expect allFeeds to be Defined and
        * that the length of the array is not 0. 
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //First, expect url to be defined.
        //Next, expect url to be truthy. Empty strings evaluate to falsey.
         it('url is defined and not empty', function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url).toBeTruthy();
            });
         });

        //Ensure name is defined and not empty.
         it('name is defined and not empty', function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).toBeTruthy();
            });
         });
    });

    //Text the menu
    describe('The menu', function(){ 

        //Expect menu-hidden to be the default on page load.
         it('is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* Clicking on the menu-icon-link toggles the menu-hidden class.
          * click menu-icon-link and expect body to have no menu-hidden class.
          * click again nand expect body to have menu-hidden class.
          */
          it('changes visibility when clicked', function(){
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });

      });

    //Text initial entries
    describe('Initial Entries', function(){

        //Before feeds are loaded setTimeout to give time for async function to complete
        beforeEach(function(done){
            setTimeout(function(){
                loadFeed(0, done);
            }, 1000);
        });

        //Checks that there is more than .entry element loaded
        it("has at least 1 entry after loadFeed function is called", function(done) {
            var entries = $(".entry").length;
            expect(entries).toBeGreaterThan(0);
            done();
        });
     });

    //Test each new feed
    describe('New Feed Selection', function(){
        //variables to hold the last instances of name and URL in allFeeds
        var holdFeed;
        var holdNameFeed;

        it('changes content', function(){
            /*For each index, if on the first index and holdFeed is not defined,
            * variables holdNameFeed and holdFeed will store url and name. Expect
            * both to be defined.
            * Go through each feed and compare to the last feed. Expect new feed to
            * not be equal to the last feed. Replace hold variables with new feed.
            */
            allFeeds.forEach(function(feed){
                if(!holdFeed){
                    holdNameFeed = feed.name;
                    holdFeed = feed.url;
                    expect(holdFeed).toBeDefined();
                    expect(holdNameFeed).toBeDefined();
                } 
                else {
                    expect(feed.name).not.toBe(holdNameFeed);
                    expect(feed.url).not.toBe(holdFeed);
                    holdNameFeed = feed.name;
                    holdFeed = feed.url;
                }
            });
        });
    });
}());