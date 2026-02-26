package routers

import (
	"github.com/cdom27/open-artwork/app/controllers"
	"github.com/gin-gonic/gin"
)

func AddArtworkRoutes(rg *gin.RouterGroup) {
	artworks := rg.Group("/artworks")

	artworks.GET("/", controllers.GetArtworks)

	artworks.GET("/:id", controllers.GetArtworkByID)

	artworks.GET("/random", controllers.GetRandomArtwork)
}
