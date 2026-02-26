package controllers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func GetArtworks(c *gin.Context) {
	params := c.Request.URL.Query()

	c.JSON(http.StatusOK, gin.H{
		"params": params,
	})

}

func GetArtworkByID(c *gin.Context) {
	path := c.Request.URL.Path
	splits := strings.Split(path, "/")
	id := splits[len(splits)-1]

	c.JSON(http.StatusOK, gin.H{
		"id": id,
	})
}

func GetRandomArtwork(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"artwork": "something random",
	})
}
