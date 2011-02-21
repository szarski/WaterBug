node = document.createElement('script');
node.type = 'text/javascript';
node.src = document.location.protocol+'<%= JAVASCRIPT_URL_WITHOUT_PROTOCOL %>';
document.getElementsByTagName("head")[0].appendChild(node);
