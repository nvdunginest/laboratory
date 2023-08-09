FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

ENV ASPNETCORE_URLS=http://+:80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
ARG configuration=Release
WORKDIR /src
COPY ["Laboratory.Web.Api/Laboratory.Web.Api.csproj", "Laboratory.Web.Api/"]
RUN dotnet restore "Laboratory.Web.Api/Laboratory.Web.Api.csproj"
COPY . .
WORKDIR "/src/Laboratory.Web.Api"
RUN dotnet build "Laboratory.Web.Api.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "Laboratory.Web.Api.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Laboratory.Web.Api.dll"]
