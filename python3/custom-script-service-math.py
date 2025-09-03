# This script is for a DF Script Service!

# This script will do a specified math operation on the supplied parameters.

verb = event.request.method
 
if verb != 'GET':
    raise Exception('Only HTTP GET is allowed on this endpoint.')
 
# get resource, /math —> "", /math/add —> "add"
resource = event.resource
 
# get query params from request
params = event.request.parameters
 
required = ['n1', 'n2']
 
if resource != "":
  for element in required:
    if params.get(element, "") == "":
    raise Exception('Missing ' + element + ' in params.')
 
  n1 = float(params.n1)
  n2 = float(params.n2)
 
if resource == "":
  # /math means return all supported resources
  result = {'resource':['add', 'subtract', 'multiply', 'divide']}
elif resource == "add":
    result = {'result':(n1+n2)}
elif resource == "subtract":
    result = {'result':(n1-n2)}
elif resource == "multiply":
    result = {'result':(n1*n2)}
elif resource == "divide":
    if n2 == 0:
        raise Exception('Divide by zero error.')
    result = {'result':(n1/n2)}
else:
    raise Exception('Invalid or missing resource name.')
 
return result

# To Test:
# From any REST client, make the request GET /api/v2/math/add?n1=4&n2=5 and you should get back the result of 9.
# A simple REST client can be found at <your_instance_url>/test_rest.html. Remember, if you are not an admin
# user, your user role must allow access to the scripting service. 
