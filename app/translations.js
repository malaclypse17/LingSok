/**
 * Dialog Default Translations.
 *
 * Include this module if you're not already using angular-translate in your application, and
 * add it to your application module's dependency list in order to get default header and 
 * dialog messages to appear.
 * 
 * Ex: var myApp = angular.module('myApplication',['dialogs.main','dialogs.default-translations']);
 *
 * It was necessary to separate this out for those already using angular-translate because this would
 * automatically reset their translation list for 'en-US'
 *
 * For those already using angular-translate, just copy the list of DIALOG_[..] translations to your
 * translation list where you set 'en-US' using the $translateProvider.
 */

//== Translations =============================================================//

 angular.module('dialogs.default-translations',['pascalprecht.translate'])
 /**
     * Default translations in English.
     * 
     * Use angular-translate's $translateProvider to provide translations in an
     * alternate language.
     *
     * $translateProvider.translations('[lang]',{[translations]});
     * To use alternate translations set the preferred language to your desired
     * language.
     * $translateProvider.preferredLanguage('[lang]');
     */
    .config(['$translateProvider',function($translateProvider){
        $translateProvider.translations('sv-SE',{
            DIALOGS_ERROR: "Fel",
            DIALOGS_ERROR_MSG: "Ett ok�nt fel har uppst�tt.",
            DIALOGS_CLOSE: "St�ng",
            DIALOGS_PLEASE_WAIT: "Var god v�nta",
            DIALOGS_PLEASE_WAIT_ELIPS: "Var god v�nta...",
            DIALOGS_PLEASE_WAIT_MSG: "V�ntar p� att �tg�rden skall bli f�rdig.",
            DIALOGS_PERCENT_COMPLETE: "% F�rdig",
            DIALOGS_NOTIFICATION: "Meddelande",
            DIALOGS_NOTIFICATION_MSG: "Ok�nt applikationsmeddelande.",
            DIALOGS_CONFIRMATION: "Bekr�ftelse",
            DIALOGS_CONFIRMATION_MSG: "Bekr�fta �tg�rden.",
            DIALOGS_OK: "OK",
            DIALOGS_YES: "Ja",
            DIALOGS_NO: "Nej"
        });

        $translateProvider.preferredLanguage('sv-SE');
    }]); // end config