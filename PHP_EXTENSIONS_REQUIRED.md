# Required PHP Extensions for Laravel 10

## Enable These Extensions in cPanel:

### In cPanel PHP Extensions/Modules:
1. **Go to "PHP Extensions"** or **"Select PHP Version" > Extensions**
2. **Enable these extensions:**
   - ✅ **bcmath** - For precise calculations
   - ✅ **ctype** - Character type checking
   - ✅ **curl** - HTTP requests
   - ✅ **dom** - XML document processing
   - ✅ **fileinfo** - File information
   - ✅ **filter** - Data filtering
   - ✅ **hash** - Hashing algorithms
   - ✅ **json** - JSON processing
   - ✅ **libxml** - XML library
   - ✅ **mbstring** - Multibyte string handling
   - ✅ **openssl** - SSL/TLS support
   - ✅ **pcre** - Regular expressions
   - ✅ **pdo** - Database abstraction
   - ✅ **pdo_pgsql** - PostgreSQL support
   - ✅ **session** - Session handling
   - ✅ **tokenizer** - PHP tokenizer
   - ✅ **xml** - XML processing
   - ✅ **zip** - Archive handling

### Most Important for Your Setup:
- **pdo_pgsql** - For PostgreSQL database
- **fileinfo** - For file uploads
- **zip** - For Composer
- **openssl** - For encryption

## After Enabling Extensions:
Your Laravel 10 application should work smoothly with PHP 8.2+!
