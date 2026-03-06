package models

import "time"

// Artist represents a creator of artworks.
// DeathYear is nullable if the artist is still alive.
type Artist struct {
	ID            uint      `gorm:"primaryKey" json:"id" db:"id"`
	Name          string    `gorm:"type:varchar(255);not null" json:"name" db:"name"`
	NameAlphaSort string    `gorm:"type:varchar(255);not null" json:"alphaSort" db:"alpha_sort"`
	Nationality   string    `gorm:"type:varchar(255);not null" json:"nationality" db:"nationality"`
	BirthYear     int       `gorm:"not null" json:"birthYear" db:"birth_year"`
	DeathYear     *int      `json:"deathYear" db:"death_year"`
	CreatedAt     time.Time `gorm:"type:timestamptz;not null;<-:create" json:"-" db:"created_at"`
	UpdatedAt     time.Time `gorm:"type:timestamptz;not null" json:"-" db:"updated_at"`
}
