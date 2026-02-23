package main

import (
	"log"
	"net/http"
	"os"

	"github.com/cdom27/open-artwork/database"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file:", err)
	}

	port := os.Getenv("PORT")

	database.InitDB()
	r := gin.Default()

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	log.Fatal(r.Run(":" + port))
}
