# POST /api/v2/user/register triggers script user.register.post.post_process
# This script runs AFTER user is registered
# The purpose of this script is to send a confirmation email to the user when "Allow Open Registration" is enabled, but
# "Open Reg Email Service" is left blank under the user service configuration (because confirmation isn't required)

# get request payload
payload = event.request.payload

# if the payload has data, grab the name and email of the user whom was just registered
if(payload):
    name = payload.first_name
    email = payload.email

    # build the payload required for the email service
    # note that parameters to be used by the template must be declared before "to":
    email_payload = '{"user_name": "' + name + '", "user_email": "' + email + '", "to": [{"name": "' + name + '", "email": "' + email + '"}]}'

    # call email service with template name via platform api POST
    platform.api.post('email?template=Register%20No%20Confirm', email_payload)


# Create a new email template via Admin>Config>Email Templates
# Paste the HTML below into the template body
# Name the template "Register No Confirm"
#
# Email Template Body HTML:
# <div style="padding: 10px;">
#                                 <p>
#                                    Hello {user_name},
#                                 </p>
#                                 <p>
#                                     You are receiving this email because {user_email} was registered with Dreamfactory.
#                                 </p>
#                             </div>
