USE authentiq_db;

-- 1. Users table
CREATE TABLE
    users (
        id CHAR(36) PRIMARY KEY,
        email VARCHAR(255) NULL,
        phone VARCHAR(20) NULL,
        is_anonymous BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_phone (phone)
    );

-- 2. Product Categories table (needs to be created before products)
CREATE TABLE
    product_categories (
        id CHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        parent_category_id CHAR(36) NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (parent_category_id) REFERENCES product_categories (id) ON DELETE SET NULL,
        INDEX idx_name (name),
        INDEX idx_parent (parent_category_id)
    );

-- 3. Manufacturer Applications table
CREATE TABLE
    manufacturer_applications (
        id CHAR(36) PRIMARY KEY,
        company_name VARCHAR(255) NOT NULL,
        contact_email VARCHAR(255) NOT NULL,
        contact_phone VARCHAR(20),
        business_registration_number VARCHAR(100),
        tax_id VARCHAR(100),
        business_address TEXT,
        website_url VARCHAR(500),
        business_license_url VARCHAR(500),
        industry_type VARCHAR(100),
        product_categories JSON,
        application_status ENUM ('pending', 'under_review', 'approved', 'rejected') DEFAULT 'pending',
        rejection_reason TEXT,
        reviewed_by CHAR(36) NULL,
        reviewed_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_status (application_status),
        INDEX idx_company (company_name),
        INDEX idx_email (contact_email)
    );

-- 4. Manufacturers table
CREATE TABLE
    manufacturers (
        id CHAR(36) PRIMARY KEY,
        application_id CHAR(36) NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        contact_email VARCHAR(255) NOT NULL,
        contact_phone VARCHAR(20),
        business_registration_number VARCHAR(100),
        tax_id VARCHAR(100),
        business_address TEXT,
        website_url VARCHAR(500),
        logo_url VARCHAR(500),
        industry_type VARCHAR(100),
        is_active BOOLEAN DEFAULT TRUE,
        verification_date TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (application_id) REFERENCES manufacturer_applications (id) ON DELETE CASCADE,
        INDEX idx_company (company_name),
        INDEX idx_active (is_active),
        INDEX idx_industry (industry_type)
    );

-- 5. Products table
CREATE TABLE
    products (
        id CHAR(36) PRIMARY KEY,
        manufacturer_id CHAR(36) NOT NULL,
        category_id CHAR(36) NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        barcode VARCHAR(100) UNIQUE,
        qr_code_hash VARCHAR(255),
        image_url VARCHAR(500),
        batch_code VARCHAR(100),
        specifications JSON,
        msrp DECIMAL(10, 2),
        release_date DATE,
        expiry_date DATE,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (manufacturer_id) REFERENCES manufacturers (id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES product_categories (id) ON DELETE RESTRICT,
        INDEX idx_barcode (barcode),
        INDEX idx_manufacturer (manufacturer_id),
        INDEX idx_category (category_id),
        INDEX idx_name (name),
        INDEX idx_active (is_active)
    );

-- 6. Product Scans table
CREATE TABLE
    product_scans (
        id CHAR(36) PRIMARY KEY,
        user_id CHAR(36) NOT NULL,
        product_id CHAR(36) NULL,
        scanned_barcode VARCHAR(100) NOT NULL,
        scan_result ENUM (
            'authentic',
            'counterfeit',
            'not_found',
            'suspicious'
        ) NOT NULL,
        location JSON,
        device_info JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE SET NULL,
        INDEX idx_user (user_id),
        INDEX idx_product (product_id),
        INDEX idx_barcode (scanned_barcode),
        INDEX idx_result (scan_result),
        INDEX idx_created (created_at)
    );

-- 7. Admins table
CREATE TABLE
    admins (
        id CHAR(36) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        role ENUM (
            'superadmin',
            'moderator',
            'reviewer',
            'investigator'
        ) NOT NULL,
        permissions JSON,
        is_active BOOLEAN DEFAULT TRUE,
        last_login TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_role (role),
        INDEX idx_active (is_active)
    );

-- 8. Counterfeit Reports table
CREATE TABLE
    counterfeit_reports (
        id CHAR(36) PRIMARY KEY,
        user_id CHAR(36) NOT NULL,
        product_id CHAR(36) NULL,
        scan_id CHAR(36) NULL,
        report_type ENUM (
            'counterfeit',
            'suspicious',
            'quality_issue',
            'expired'
        ) NOT NULL,
        description TEXT,
        image_urls JSON,
        location JSON,
        purchase_location VARCHAR(255),
        purchase_date DATE,
        purchase_price DECIMAL(10, 2),
        status ENUM (
            'open',
            'under_review',
            'investigating',
            'resolved',
            'closed'
        ) DEFAULT 'open',
        priority ENUM ('low', 'medium', 'high', 'critical') DEFAULT 'medium',
        assigned_to CHAR(36) NULL,
        resolution_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE SET NULL,
        FOREIGN KEY (scan_id) REFERENCES product_scans (id) ON DELETE SET NULL,
        FOREIGN KEY (assigned_to) REFERENCES admins (id) ON DELETE SET NULL,
        INDEX idx_user (user_id),
        INDEX idx_product (product_id),
        INDEX idx_status (status),
        INDEX idx_priority (priority),
        INDEX idx_assigned (assigned_to),
        INDEX idx_created (created_at)
    );

-- 9. Notification Logs table
CREATE TABLE
    notification_logs (
        id CHAR(36) PRIMARY KEY,
        recipient_type ENUM ('user', 'manufacturer', 'admin') NOT NULL,
        recipient_id CHAR(36) NOT NULL,
        notification_type ENUM (
            'scan_alert',
            'report_update',
            'application_status',
            'product_alert'
        ) NOT NULL,
        title VARCHAR(255) NOT NULL,
        message TEXT,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        read_at TIMESTAMP NULL,
        INDEX idx_recipient (recipient_type, recipient_id),
        INDEX idx_type (notification_type),
        INDEX idx_sent (sent_at),
        INDEX idx_read (read_at)
    );

-- Add foreign key constraints that reference admins table
ALTER TABLE manufacturer_applications ADD CONSTRAINT fk_manufacturer_applications_reviewed_by FOREIGN KEY (reviewed_by) REFERENCES admins (id) ON DELETE SET NULL;