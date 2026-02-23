package database

import (
	"log"
	"os"

	"github.com/cdom27/open-artwork/app/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

// InitDB initializes a connection to the database
func InitDB() {
	dsn := os.Getenv("DATABASE_URL")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to the database:", err)
	}

	DB = db
	log.Println("Database connection successful")
}

// MigrateDB performs schema migrations for the app's db.
func MigrateDB() {
	err := DB.AutoMigrate(&models.Artwork{})

	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	log.Println("Database migration successful")
}
