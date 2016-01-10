
# Flydrawr
This plugin is not yet at 1.0; use will require some more CSS tweaking than ideal and will not initialize just via decorators alone.

## Instructions for use

### Inititalize

1. #### Add your flydrawr element
	The flydrawer plugin looks for an empty div with the attribute ```data-flydrawer``` 

		<div id="fly-search" data-flydrawer></div>

	**Important:** Make sure to set the ```id=``` on the ```div```. 


1. #### Add a button to open the drawer
	Add ```data-flydrawer-id``` attribute with a value of the corresponding id
 to the button that should open the drawer.

		<a data-flydrawer-id="fly-search">Search</a> 

1. #### Init via JavaScript
	
		$('#fly-search').flyDrawer();


### Icons

1. #### Set search icon 
	You will also need to set search icons 
	  
		.flydrawer-search-box .flydrawer-search-mimic span:before {
		    content: '';
		    background-image: url("icon-search-24.png");
		}


1. #### Set the position of the search icon while typing
	Right now you manually need to set the position of the search-mimic element to match the x-position of your search field

		.search-box .search-mimic {
      		top: 120px;
		}

