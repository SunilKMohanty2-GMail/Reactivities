using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController : BaseApiController 
{
    /* 
    private readonly AppDbContext context = context;
    public ActivitiesController(AppDbContext context)
    {
        this.context = context;
    } 
    */

    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        //return await context.Activities.ToListAsync();
        return await Mediator.Send(new GetActivityList.Query());

        //How to pass the cancellation token to handler
        //1. Add a parameter CancellationToken cancellationToken to the function signature
        //2. Pass the cancellationToken to the handler
        //return await Mediator.Send(new GetActivityList.Query(), cancellationToken);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        /* 
        var activity = await context.Activities.FindAsync(id);
        if(activity == null) return NotFound();
        return activity;
        */
        return HandleResult(await Mediator.Send(new GetActivityDetails.Query{Id = id}));
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto)
    {
        return HandleResult(await Mediator.Send(new CreateActivity.Command{ActivityDto = activityDto}));
    }

    [HttpPut]
    public async Task<ActionResult> EditActivity(EditActivityDto activityDto)
    {
        return HandleResult(await Mediator.Send(new EditActivity.Command{ActivityDto = activityDto}));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Activity>> DeleteActivity(string id)
    {
        return HandleResult(await Mediator.Send(new DeleteActivity.Command{Id = id}));
    }
}
