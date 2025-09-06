# How to Upgrade PHP to 8.2+ in cPanel

## Method 1: Using PHP Selector
1. **Login to cPanel**
2. **Find "Select PHP Version"** or **"PHP Selector"** in the Software section
3. **Click on it** to open the PHP version manager
4. **Select PHP 8.2** or **PHP 8.3** from the dropdown
5. **Click "Set as current"** or **"Apply"**
6. **Wait for the change** to take effect (usually instant)

## Method 2: Using MultiPHP Manager  
1. **Login to cPanel**
2. **Find "MultiPHP Manager"** in the Software section
3. **Select your domain** from the list
4. **Choose PHP 8.2** or **PHP 8.3** from the dropdown
5. **Click "Apply"**

## Method 3: Contact Your Host
If PHP 8.2+ is not available:
1. **Contact your hosting provider** via support ticket
2. **Request PHP 8.2 or 8.3** to be enabled
3. **Most modern hosts** support these versions

## Verify the Upgrade
Create a file called `phpinfo.php` in your public_html:
```php
<?php
phpinfo();
?>
```
Visit: https://galloways.co.ke/phpinfo.php
(Delete this file after checking for security)

## After PHP Upgrade
Run in your cPanel terminal or file manager:
```bash
cd public_html/backend-laravel
composer install --optimize-autoloader --no-dev
php artisan --version
```

Your Laravel 10 application will then work perfectly with PHP 8.2+!
