package models

import "time"

// Artwork represents a public domain artwork.
// Most pointer fields reflect nullable database columns.
type Artwork struct {
	ID       uint   `gorm:"primaryKey" json:"id" db:"id"`
	Title    string `gorm:"type:varchar(255);not null;default:Untitled Artwork" json:"title" db:"title"`
	Slug     string `gorm:"type:varchar(255);not null" json:"slug" db:"slug"`
	ArtistID uint   `gorm:"not null" json:"artistID" db:"artist_id"`

	// Artist is only populated by certain queries.
	Artist         *Artist   `gorm:"foreignKey:ArtistID;constraint:OnUpdate:CASCADE,OnDelete:RESTRICT" json:"artist,omitempty"`
	Classification *string   `gorm:"type:varchar(255)" json:"classification" db:"classification"`
	Department     *string   `gorm:"type:varchar(255)" json:"department" db:"department"`
	Medium         *string   `gorm:"type:varchar(255)" json:"medium" db:"medium"`
	Dimensions     *string   `gorm:"type:varchar(255)" json:"dimensions" db:"dimensions"`
	DisplayDate    *string   `gorm:"type:varchar(255)" json:"displayDate" db:"display_date"`
	BeginYear      *int      `json:"beginYear" db:"begin_year"`
	EndYear        *int      `json:"endYear" db:"end_year"`
	CreatedAt      time.Time `gorm:"type:timestamptz;not null;<-:create" json:"-" db:"created_at"`
	UpdatedAt      time.Time `gorm:"type:timestamptz;not null" json:"-" db:"updated_at"`
}
