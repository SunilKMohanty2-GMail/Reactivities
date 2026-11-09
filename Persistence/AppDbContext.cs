using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Activity> Activities { get; set; }
    public required DbSet<ActivityAttendee> ActivityAttendees { get; set; }
    public required DbSet<Photo> Photos { get; set; }
    public required DbSet<Comment> Comments { get; set; }
    public required DbSet<UserFollowing> UserFollowings { get; set; }
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ActivityAttendee>(x =>
        {
            x.HasKey(a => new { a.ActivityId, a.UserId });

            x.HasOne(x => x.User)
                 .WithMany(x => x.Activities)
                 .HasForeignKey(x => x.UserId)
                 .OnDelete(DeleteBehavior.Cascade);

            x.HasOne(x => x.Activity)
                .WithMany(x => x.Attendees)
                .HasForeignKey(x => x.ActivityId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        builder.Entity<UserFollowing>(x =>
        {
            x.HasKey(k => new { k.ObserverId, k.TargetId });

            x.HasOne(o => o.Observer)
                .WithMany(f => f.Followings)
                .HasForeignKey(o => o.ObserverId)
                .OnDelete(DeleteBehavior.Cascade);
            x.HasOne(t => t.Target)
                .WithMany(f => f.Followers)
                .HasForeignKey(t => t.TargetId)
                .OnDelete(DeleteBehavior.NoAction);
        });

        // // [Option 1] - Correctly save and read datetimes in UTC using Entity Framework Core
        // var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
        //     // On Save: If it's already UTC, save it; otherwise, convert it to UTC
        //     v => v.Kind == DateTimeKind.Utc ? v : v.ToUniversalTime(),

        //     // On Read: Explicitly label the unspecified DB value as UTC
        //     v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
        // );

        // foreach (var entityType in builder.Model.GetEntityTypes())
        // {
        //     foreach (var property in entityType.GetProperties())
        //     {
        //         // Applies to all non-nullable DateTime fields
        //         if (property.ClrType == typeof(DateTime))
        //             property.SetValueConverter(dateTimeConverter);

        //         // Applies to all nullable DateTime fields
        //         if (property.ClrType == typeof(DateTime?))
        //             property.SetValueConverter(dateTimeConverter);
        //     }
        // }

        // [Option 2] - Correctly save and read datetimes in UTC using Entity Framework Core
        // Create a Custom UTC Value Converter (UtcDateTimeConverter class)
        // Override the ConfigureConventions method and assign the conversion to DateTime & DateTime? fields
    }

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        // Automatically applies to all non-nullable DateTime fields
        configurationBuilder
            .Properties<DateTime>()
            .HaveConversion<UtcDateTimeConverter>();

        // Automatically applies to all nullable DateTime? fields
        configurationBuilder
            .Properties<DateTime?>()
            .HaveConversion<UtcDateTimeConverter>();
    }
}
