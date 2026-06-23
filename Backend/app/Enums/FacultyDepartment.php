<?php

namespace App\Enums;

enum FacultyDepartment: string
{
    case Bca = 'bca';
    case BCom = 'b-com';
    case NonTeachingStaff = 'non-teaching-staff';

    public function label(): string
    {
        return match ($this) {
            self::Bca => 'BCA Faculty',
            self::BCom => 'B.Com Faculty',
            self::NonTeachingStaff => 'Non Teaching Staff',
        };
    }
}
