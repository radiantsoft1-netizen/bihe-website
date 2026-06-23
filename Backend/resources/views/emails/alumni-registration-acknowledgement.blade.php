Dear {{ $profile->name }},

Thank you for registering with the BIHE Alumni Network.

Your registration has been received and is under review. Use the registration ID below to track your application on the alumni registration page.

Registration ID: {{ $profile->tracking_id }}

Current status: {{ ucfirst($profile->approval_status) }}
Submitted on: {{ $profile->submitted_at?->timezone(config('app.timezone'))->format('d M Y, H:i T') }}

You can check your registration journey at any time by entering this ID on the alumni registration page.

If you have questions, contact the college office at 08192-221625 or principal@bihedvg.org.

Regards,
BIHE Alumni Office
Bapuji Institute of Hi-Tech Education
Davangere, Karnataka
