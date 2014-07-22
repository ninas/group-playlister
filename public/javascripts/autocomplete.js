var groupNameToId = {};

function parseGroupsResponse(response){
    if (response && !response.error) {
      newItems = []
      $.each(response.data, function(i, v){
        groupNameToId[v.name] = v.id;
        newItems.push({ name: v.name });
      });
      if (response.next) {

      }
      return newItems;
    } else {
      // fail silently
    }
    return []
}

function createSuggestionEngine(){
  var engine = new Bloodhound({
    local: [],
    datumTokenizer: function(d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace
  });
  engine.initialize();
  return engine;
}

function populateGroupNames() {
  var MAX_DEPTH = 5;

  var engine = createSuggestionEngine(); 
  
  var count=0;
  var apiResponse = function(response){
    engine.add(parseGroupsResponse(response));
    if (response.paging.next && count < MAX_DEPTH ) {
      console.log("Looping");
      count++;
      FB.api(response.paging.next, apiResponse); 
    }
  };

  FB.api('/me/groups', apiResponse); 

  $('#groupName').typeahead(null, {
    name: 'groups',
    displayKey: 'name',
    source: engine.ttAdapter()
  });
      
};
