package models

import (
	"database/sql/driver"
	"fmt"

	"github.com/jackc/pgx/v5/pgtype"
	"gorm.io/gorm"
)

type TextArray []string

// Scan implements sql.Scanner
func (a *TextArray) Scan(src any) error {
	m := pgtype.NewMap()

	var out []string
	if err := m.SQLScanner(&out).Scan(src); err != nil {
		return fmt.Errorf("scan TextArray: %w", err)
	}

	*a = TextArray(out)
	return nil
}

// Value implements driver.Valuer
func (a TextArray) Value() (driver.Value, error) {
	return []string(a), nil
}

type Artwork struct {
	gorm.Model
	ID             int       `gorm:"primaryKey;->" json:"id" db:"id"`
	Title          string    `gorm:"type:varchar(225);not null;->" json:"title" db:"title"`
	Slug           string    `gorm:"type:varchar(255);not null;->" json:"slug" db:"slug"`
	Classification string    `gorm:"type:varchar(255);not null;->" json:"classification" db:"classification"`
	Medium         string    `gorm:"type:varchar(255);not null;->" json:"medium" db:"medium"`
	Date           string    `gorm:"type:varchar(255);not null;->" json:"date" db:"date"`
	Department     string    `gorm:"type:varchar(255);not null;->" json:"department" db:"department"`
	Dimensions     string    `gorm:"type:varchar(255);not null;->" json:"dimensions" db:"dimensions"`
	ColorPalette   TextArray `gorm:"type:text[];not null;->" json:"colorPalette" db:"color_palette"`
}
