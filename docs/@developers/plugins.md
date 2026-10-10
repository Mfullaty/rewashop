# Creating and Extending Plugins (Addons)

Active eCommerce CMS supports an extensible architecture through "Addons" (Plugins). Addons allow developers to extend the core functionality of the platform (e.g., adding a new payment gateway, creating new features like Preorders, or integrating with third-party services) without directly modifying the core system files, though the installation process *does* copy files into the main project.

This guide explains how addons are structured and how you can build a custom addon.

## Addon Architecture

An addon is distributed as a `.zip` file. When an administrator uploads the addon via the Admin Panel, the `AddonController` extracts the zip file and performs a series of operations based on a `config.json` file found within the addon.

### The `config.json` File

The core of every addon is the `config.json` file. This file tells the CMS what files to move, what directories to create, and the metadata of the addon.

Here is an example structure of `config.json`:

```json
{
    "name": "My Custom Payment Gateway",
    "unique_identifier": "my_custom_payment",
    "version": "1.0",
    "minimum_item_version": "7.0.0",
    "addon_banner": "banner.jpg",
    "directory": [
        {
            "name": [
                "app/Http/Controllers/MyCustomPayment",
                "resources/views/backend/my_custom_payment"
            ]
        }
    ],
    "files": [
        {
            "root_directory": "src/MyPaymentController.php",
            "update_directory": "app/Http/Controllers/MyCustomPayment/MyPaymentController.php"
        }
    ],
    "folders": [
        {
            "root_directory": "src/views",
            "update_directory": "resources/views/backend/my_custom_payment"
        }
    ]
}
```

#### Breakdown of `config.json`:
*   `name`: The display name of the addon in the Admin panel.
*   `unique_identifier`: A unique string to identify the addon (used in code logic to check if it's active).
*   `version`: The current version of the addon.
*   `minimum_item_version`: The minimum version of the Active eCommerce CMS required to install this addon.
*   `addon_banner`: The image file (relative to the addon's root) to display in the Addon Manager.
*   `directory`: An array of strings specifying new directories the installer should create.
*   `files`: An array of objects.
    *   `root_directory`: The path to the file *inside* your zip file.
    *   `update_directory`: The destination path *inside* the Laravel application.
*   `folders`: Similar to `files`, but for recursively copying entire directories.

## Database Modifications

If your addon requires modifying the database schema (creating new tables or adding columns), you must include SQL scripts.

1.  Create an `sql` folder inside your addon's root directory.
2.  Include an `update.sql` file. The CMS will automatically execute `DB::unprepared(file_get_contents($sql_path))` on this file during installation.
3.  **For updates:** If you release version `1.1` of your addon, you can provide an `sql/1.1.sql` file. The installer compares the installed version with the new version and executes the intermediate SQL scripts.

## Checking if an Addon is Activated

In your core application code or blade files, you can check if a specific addon is installed and activated using the `addon_is_activated` helper function.

```php
if (addon_is_activated('my_custom_payment')) {
    // Execute custom plugin logic
    $controller = new \App\Http\Controllers\MyCustomPayment\MyPaymentController();
    return $controller->process();
}
```

> [!WARNING]
> Because the CMS verifies addons using purchase codes against a central activation server (`activation.activeitzone.com`), custom plugins distributed externally may fail the activation check unless you implement a bypass or custom activation logic for your specific addon within `AddonController::check_activation`. 

## Development Workflow

1.  **Develop Locally:** Write your controllers, models, views, and routes directly in your local CMS installation.
2.  **Extract Files:** Once the feature is working, extract the specific files you created into a new folder outside the project.
3.  **Create `config.json`:** Write the `config.json` to map your extracted files to their correct destinations in the CMS.
4.  **Create SQL Scripts:** Export any database changes you made into an `sql/update.sql` file.
5.  **Zip and Test:** Zip the folder, upload it through the Addon Manager on a fresh CMS installation, and verify everything works.
