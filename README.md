# POC: Frontend Contract Testing
Contract testing is a type of testing that allows a team to consume resources from another team, with a way to detect when there is a "violation" of the contract.
### Kinds of checks
There can be checks that are performed dynamically (i.e. by executing code and verifying the responses) or statically (i.e. by analyzing the types of the code).

In this POC, we will focus on contract testing that enables us to safely share code on the frontend.

## Dynamic Checcks
This is out of scope for the POC.

## Static Type Checking
One goal of testing when creating a new dependency might be to ensure that teams don't break existing interfaces.

This can be a problem in typescript if someone in the team decides to cast a return value to `any` or accept a function parameter with a loose type.

This POC shows an example of how we can statically check interfaces that we decide to depend on, to ensure that errors are emitted in our team's boundary when they change something.

## Mechanism
1. Team A depends on Team B for a given function interface
2. Team A writes a contract test for the interface they decide to depend on

    ... Some time passes ...

3. Team B modifies the interface to support a new feature
4. CI/CD fails because the type assertions fail
5. Team B either
    - avoids breaking the existing interface 
    
    OR
    - fixes the type assertions in team A's folder (which initiates a review via CODEOWNERS)
  
    OR

    - initiates a conversation with team A to negotiate the change

## Try it out!
Open up the files
-  `src/vfd/hooks/usePluginConfig.tsx`
    
        This contains the shared hooks for the domain
-  `src/vfd-adoptions/contracts/contracts-vfd.tsx`
    
        This contains the contract tests with type assertions

You can try to modify the files and the expected interfaces to see how the typecheck will fail.

## Why is this useful?
When speaking of breaking changes, we often talk about those that create the most work for us (e.g. renaming properties, removing support for existing implemented properties, etc.).

However, there are changes that can break the semantics of an object, but are difficult to detect in tooling.

### Example: Non-breaking breaking changes
Suppose we have a shared Plugin Config object:
```
allowCreation: {
    value: true | false
}
```

Teams then procceed to write their logic to use this object:
```ts
const { allowCreation } = usePluginConfig();

if (allowCreation.value) {
    // do something
}
```

Now, suppose we add a new property to the object:
```ts
allowCreation: {
    value: true | false
    forRoles: ['admin', 'user']
}
```

While technical speaking, this is not a breaking change since it was a new property, the semantics have changed amd everyone who used the old object would likely be interpreting it wrongly.

This is also one of the downsides of only using interfaces for the domain objects (topic for another time).

## The backend is just as susceptible
It is important to note that these kind of issues can also happen on the backend, and thus making it primarily a backend responsibility is not a solution.

## How do we solve this?
These kinds of problems are challenging to solve, and generally involve simplifying, and sharing only things that must absolutely be shared. 

The problem with sharing is that it defers the cost of implementation to the cost of change. This is a similar issue we have with Tech Debt althogh not identical.

Contract testing helps us to reduce the cost of change, by helping us detect when unwanted changes happen.

## Conclusion
Being able to make assertions about functions belonging to other teams is another tool in our toolbox that we can use to detect changes that may affect our users, which is a win.