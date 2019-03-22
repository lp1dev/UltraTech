(function() {
    console.warn('Debugging ::');
    
    function checkAPIStatus() {
	const req = new XMLHttpRequest();
	try {
	    req.open('GET', 'http://localhost:8081/ping?ip=127.0.0.1', true);
	    req.onload = function (e) {
		if (req.readyState === 4) {
		    if (req.status === 200) {
			console.log(req.responseText);
		    } else {
			console.error(req.statusText);
		    }
		}
	    };
	    req.onerror = function (e) {
		console.error(xhr.statusText);
	    };
	    req.send(null);
	}
	catch (e) {
	    console.error(e)
	    console.log('API Error');
	}
	if (req.status === 200) {
	    console.log('Debug:: API OK')
	} else {
	    console.log('Debug:: API Error')
	}
    }
    checkAPIStatus()
    const interval = setInterval(checkAPIStatus, 10000);
})();
