package queries

import (
	"github.com/cdom27/open-artwork/app/models"
	"github.com/cdom27/open-artwork/database"
)

// future support:
// filtering - artist, medium, department, similar colors, min date, max date
// sorting - alphabetical, department, medium, neweset, oldest

// GetArtworkByID retrieves an artwork by its ID
func GetArtworkByID(id int) (models.Artwork, error) {
	var artwork models.Artwork
	result := database.DB.Where("id = ?", id).Find(&artwork).Limit(1)

	return artwork, result.Error
}

// GetRandomArtwork retrieves a random artwork
func GetRandomArtwork() (models.Artwork, error) {
	var artwork models.Artwork
	result := database.DB.Raw("SELECT * FROM artworks ORDER BY RAND() LIMIT 1")

	return artwork, result.Error
}
