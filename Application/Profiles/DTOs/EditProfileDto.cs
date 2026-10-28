using System;

namespace Application.Profiles.DTOs;

public class EditProfileDto
{
    public string DisplayName { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
}
