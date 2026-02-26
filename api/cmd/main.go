package main

import (
	"log"
	"os"

	"github.com/cdom27/open-artwork/app/routers"
	"github.com/cdom27/open-artwork/database"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

var r = gin.Default()

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file:", err)
	}

	port := os.Getenv("PORT")

	database.InitDB()
	database.MigrateDB()

	getRoutes()

	log.Fatal(r.Run(":" + port))
}

// getRoutes creates the route groups for the api
func getRoutes() {
	v1 := r.Group("/v1")
	routers.AddArtworkRoutes(v1)
}
