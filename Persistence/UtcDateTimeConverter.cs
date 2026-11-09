using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Persistence;

public class UtcDateTimeConverter : ValueConverter<DateTime, DateTime>
{
    public UtcDateTimeConverter() : base (
        // On Write: If it's already UTC, save it; otherwise, convert it to UTC
        v => v.Kind == DateTimeKind.Utc ? v : v.ToUniversalTime(),
        
        // On Read: Explicitly label the unspecified DB value as UTC
        v => DateTime.SpecifyKind(v, DateTimeKind.Utc))
    {}
}
